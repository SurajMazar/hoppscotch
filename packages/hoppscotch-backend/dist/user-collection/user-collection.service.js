"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCollectionService = void 0;
const common_1 = require("@nestjs/common");
const errors_1 = require("../errors");
const prisma_service_1 = require("../prisma/prisma.service");
const E = require("fp-ts/Either");
const O = require("fp-ts/Option");
const pubsub_service_1 = require("../pubsub/pubsub.service");
const RequestTypes_1 = require("../types/RequestTypes");
const utils_1 = require("../utils");
let UserCollectionService = class UserCollectionService {
    constructor(prisma, pubsub) {
        this.prisma = prisma;
        this.pubsub = pubsub;
        this.TITLE_LENGTH = 1;
    }
    cast(collection) {
        return Object.assign(Object.assign({}, collection), { userID: collection.userUid });
    }
    async getChildCollectionsCount(collectionID) {
        const childCollectionCount = await this.prisma.userCollection.findMany({
            where: { parentID: collectionID },
            orderBy: {
                orderIndex: 'desc',
            },
        });
        if (!childCollectionCount.length)
            return 0;
        return childCollectionCount[0].orderIndex;
    }
    async getRootCollectionsCount(userID) {
        const rootCollectionCount = await this.prisma.userCollection.findMany({
            where: { userUid: userID, parentID: null },
            orderBy: {
                orderIndex: 'desc',
            },
        });
        if (!rootCollectionCount.length)
            return 0;
        return rootCollectionCount[0].orderIndex;
    }
    async isOwnerCheck(collectionID, userID) {
        try {
            await this.prisma.userCollection.findFirstOrThrow({
                where: {
                    id: collectionID,
                    userUid: userID,
                },
            });
            return O.some(true);
        }
        catch (error) {
            return O.none;
        }
    }
    async getUserOfCollection(collectionID) {
        try {
            const userCollection = await this.prisma.userCollection.findUniqueOrThrow({
                where: {
                    id: collectionID,
                },
                include: {
                    user: true,
                },
            });
            return E.right(userCollection.user);
        }
        catch (error) {
            return E.left(errors_1.USER_NOT_FOUND);
        }
    }
    async getParentOfUserCollection(collectionID) {
        const { parent } = await this.prisma.userCollection.findUnique({
            where: {
                id: collectionID,
            },
            include: {
                parent: true,
            },
        });
        return parent;
    }
    async getChildrenOfUserCollection(collectionID, cursor, take, type) {
        return this.prisma.userCollection.findMany({
            where: {
                parentID: collectionID,
                type: type,
            },
            orderBy: {
                orderIndex: 'asc',
            },
            take: take,
            skip: cursor ? 1 : 0,
            cursor: cursor ? { id: cursor } : undefined,
        });
    }
    async getUserCollection(collectionID) {
        try {
            const userCollection = await this.prisma.userCollection.findUniqueOrThrow({
                where: {
                    id: collectionID,
                },
            });
            return E.right(userCollection);
        }
        catch (error) {
            return E.left(errors_1.USER_COLL_NOT_FOUND);
        }
    }
    async createUserCollection(user, title, parentUserCollectionID, type) {
        const isTitleValid = (0, utils_1.isValidLength)(title, this.TITLE_LENGTH);
        if (!isTitleValid)
            return E.left(errors_1.USER_COLL_SHORT_TITLE);
        if (parentUserCollectionID !== null) {
            const parentCollection = await this.getUserCollection(parentUserCollectionID);
            if (E.isLeft(parentCollection))
                return E.left(parentCollection.left);
            if (parentCollection.right.userUid !== user.uid)
                return E.left(errors_1.USER_NOT_OWNER);
            if (parentCollection.right.type !== type)
                return E.left(errors_1.USER_COLL_NOT_SAME_TYPE);
        }
        const isParent = parentUserCollectionID
            ? {
                connect: {
                    id: parentUserCollectionID,
                },
            }
            : undefined;
        const userCollection = await this.prisma.userCollection.create({
            data: {
                title: title,
                type: type,
                user: {
                    connect: {
                        uid: user.uid,
                    },
                },
                parent: isParent,
                orderIndex: !parentUserCollectionID
                    ? (await this.getRootCollectionsCount(user.uid)) + 1
                    : (await this.getChildCollectionsCount(parentUserCollectionID)) + 1,
            },
        });
        await this.pubsub.publish(`user_coll/${user.uid}/created`, userCollection);
        return E.right(userCollection);
    }
    async getUserRootCollections(user, cursor, take, type) {
        return this.prisma.userCollection.findMany({
            where: {
                userUid: user.uid,
                parentID: null,
                type: type,
            },
            orderBy: {
                orderIndex: 'asc',
            },
            take: take,
            skip: cursor ? 1 : 0,
            cursor: cursor ? { id: cursor } : undefined,
        });
    }
    async getUserChildCollections(user, userCollectionID, cursor, take, type) {
        return this.prisma.userCollection.findMany({
            where: {
                userUid: user.uid,
                parentID: userCollectionID,
                type: type,
            },
            take: take,
            skip: cursor ? 1 : 0,
            cursor: cursor ? { id: cursor } : undefined,
        });
    }
    async renameUserCollection(newTitle, userCollectionID, userID) {
        const isTitleValid = (0, utils_1.isValidLength)(newTitle, this.TITLE_LENGTH);
        if (!isTitleValid)
            return E.left(errors_1.USER_COLL_SHORT_TITLE);
        const isOwner = await this.isOwnerCheck(userCollectionID, userID);
        if (O.isNone(isOwner))
            return E.left(errors_1.USER_NOT_OWNER);
        try {
            const updatedUserCollection = await this.prisma.userCollection.update({
                where: {
                    id: userCollectionID,
                },
                data: {
                    title: newTitle,
                },
            });
            this.pubsub.publish(`user_coll/${updatedUserCollection.userUid}/updated`, updatedUserCollection);
            return E.right(updatedUserCollection);
        }
        catch (error) {
            return E.left(errors_1.USER_COLL_NOT_FOUND);
        }
    }
    async removeUserCollection(collectionID) {
        try {
            const deletedUserCollection = await this.prisma.userCollection.delete({
                where: {
                    id: collectionID,
                },
            });
            return E.right(deletedUserCollection);
        }
        catch (error) {
            return E.left(errors_1.USER_COLL_NOT_FOUND);
        }
    }
    async deleteCollectionData(collection) {
        const childCollectionList = await this.prisma.userCollection.findMany({
            where: {
                parentID: collection.id,
            },
        });
        await Promise.all(childCollectionList.map((coll) => this.deleteUserCollection(coll.id, coll.userUid)));
        await this.prisma.userRequest.deleteMany({
            where: {
                collectionID: collection.id,
            },
        });
        await this.updateOrderIndex(collection.parentID, { gt: collection.orderIndex }, { decrement: 1 });
        const deletedUserCollection = await this.removeUserCollection(collection.id);
        if (E.isLeft(deletedUserCollection))
            return E.left(deletedUserCollection.left);
        this.pubsub.publish(`user_coll/${deletedUserCollection.right.userUid}/deleted`, {
            id: deletedUserCollection.right.id,
            type: RequestTypes_1.ReqType[deletedUserCollection.right.type],
        });
        return E.right(true);
    }
    async deleteUserCollection(collectionID, userID) {
        const collection = await this.getUserCollection(collectionID);
        if (E.isLeft(collection))
            return E.left(errors_1.USER_COLL_NOT_FOUND);
        if (collection.right.userUid !== userID)
            return E.left(errors_1.USER_NOT_OWNER);
        const collectionData = await this.deleteCollectionData(collection.right);
        if (E.isLeft(collectionData))
            return E.left(collectionData.left);
        return E.right(true);
    }
    async changeParent(collection, parentCollectionID) {
        try {
            let collectionCount;
            if (!parentCollectionID)
                collectionCount = await this.getRootCollectionsCount(collection.userUid);
            collectionCount = await this.getChildCollectionsCount(parentCollectionID);
            const updatedCollection = await this.prisma.userCollection.update({
                where: {
                    id: collection.id,
                },
                data: {
                    parentID: parentCollectionID,
                    orderIndex: collectionCount + 1,
                },
            });
            return E.right(updatedCollection);
        }
        catch (error) {
            return E.left(errors_1.USER_COLL_NOT_FOUND);
        }
    }
    async isParent(collection, destCollection) {
        if (collection === destCollection) {
            return O.none;
        }
        if (destCollection.parentID !== null) {
            if (destCollection.parentID === collection.id) {
                return O.none;
            }
            const parentCollection = await this.getUserCollection(destCollection.parentID);
            if (E.isLeft(parentCollection)) {
                return O.none;
            }
            return await this.isParent(collection, parentCollection.right);
        }
        else {
            return O.some(true);
        }
    }
    async updateOrderIndex(parentID, orderIndexCondition, dataCondition) {
        const updatedUserCollection = await this.prisma.userCollection.updateMany({
            where: {
                parentID: parentID,
                orderIndex: orderIndexCondition,
            },
            data: { orderIndex: dataCondition },
        });
        return updatedUserCollection;
    }
    async moveUserCollection(userCollectionID, destCollectionID, userID) {
        const collection = await this.getUserCollection(userCollectionID);
        if (E.isLeft(collection))
            return E.left(errors_1.USER_COLL_NOT_FOUND);
        if (collection.right.userUid !== userID)
            return E.left(errors_1.USER_NOT_OWNER);
        if (!destCollectionID) {
            if (!collection.right.parentID) {
                return E.left(errors_1.USER_COLL_ALREADY_ROOT);
            }
            await this.updateOrderIndex(collection.right.parentID, { gt: collection.right.orderIndex }, { decrement: 1 });
            const updatedCollection = await this.changeParent(collection.right, null);
            if (E.isLeft(updatedCollection))
                return E.left(updatedCollection.left);
            this.pubsub.publish(`user_coll/${collection.right.userUid}/moved`, updatedCollection.right);
            return E.right(updatedCollection.right);
        }
        if (userCollectionID === destCollectionID) {
            return E.left(errors_1.USER_COLL_DEST_SAME);
        }
        const destCollection = await this.getUserCollection(destCollectionID);
        if (E.isLeft(destCollection))
            return E.left(errors_1.USER_COLL_NOT_FOUND);
        if (collection.right.type !== destCollection.right.type) {
            return E.left(errors_1.USER_COLL_NOT_SAME_TYPE);
        }
        if (collection.right.userUid !== destCollection.right.userUid) {
            return E.left(errors_1.USER_COLL_NOT_SAME_USER);
        }
        const checkIfParent = await this.isParent(collection.right, destCollection.right);
        if (O.isNone(checkIfParent)) {
            return E.left(errors_1.USER_COLL_IS_PARENT_COLL);
        }
        await this.updateOrderIndex(collection.right.parentID, { gt: collection.right.orderIndex }, { decrement: 1 });
        const updatedCollection = await this.changeParent(collection.right, destCollection.right.id);
        if (E.isLeft(updatedCollection))
            return E.left(updatedCollection.left);
        this.pubsub.publish(`user_coll/${collection.right.userUid}/moved`, updatedCollection.right);
        return E.right(updatedCollection.right);
    }
    getCollectionCount(collectionID) {
        return this.prisma.userCollection.count({
            where: { parentID: collectionID },
        });
    }
    async updateUserCollectionOrder(collectionID, nextCollectionID, userID) {
        if (collectionID === nextCollectionID)
            return E.left(errors_1.USER_COLL_SAME_NEXT_COLL);
        const collection = await this.getUserCollection(collectionID);
        if (E.isLeft(collection))
            return E.left(errors_1.USER_COLL_NOT_FOUND);
        if (collection.right.userUid !== userID)
            return E.left(errors_1.USER_NOT_OWNER);
        if (!nextCollectionID) {
            try {
                await this.prisma.$transaction(async (tx) => {
                    await tx.userCollection.updateMany({
                        where: {
                            parentID: collection.right.parentID,
                            orderIndex: {
                                gte: collection.right.orderIndex + 1,
                            },
                        },
                        data: {
                            orderIndex: { decrement: 1 },
                        },
                    });
                    const updatedUserCollection = await tx.userCollection.update({
                        where: { id: collection.right.id },
                        data: {
                            orderIndex: await this.getCollectionCount(collection.right.parentID),
                        },
                    });
                });
                this.pubsub.publish(`user_coll/${collection.right.userUid}/order_updated`, {
                    userCollection: this.cast(collection.right),
                    nextUserCollection: null,
                });
                return E.right(true);
            }
            catch (error) {
                return E.left(errors_1.USER_COLL_REORDERING_FAILED);
            }
        }
        const subsequentCollection = await this.getUserCollection(nextCollectionID);
        if (E.isLeft(subsequentCollection))
            return E.left(errors_1.USER_COLL_NOT_FOUND);
        if (collection.right.userUid !== subsequentCollection.right.userUid)
            return E.left(errors_1.USER_COLL_NOT_SAME_USER);
        if (collection.right.type !== subsequentCollection.right.type) {
            return E.left(errors_1.USER_COLL_NOT_SAME_TYPE);
        }
        try {
            await this.prisma.$transaction(async (tx) => {
                const isMovingUp = subsequentCollection.right.orderIndex < collection.right.orderIndex;
                const updateFrom = isMovingUp
                    ? subsequentCollection.right.orderIndex
                    : collection.right.orderIndex + 1;
                const updateTo = isMovingUp
                    ? collection.right.orderIndex - 1
                    : subsequentCollection.right.orderIndex - 1;
                await tx.userCollection.updateMany({
                    where: {
                        parentID: collection.right.parentID,
                        orderIndex: { gte: updateFrom, lte: updateTo },
                    },
                    data: {
                        orderIndex: isMovingUp ? { increment: 1 } : { decrement: 1 },
                    },
                });
                const updatedUserCollection = await tx.userCollection.update({
                    where: { id: collection.right.id },
                    data: {
                        orderIndex: isMovingUp
                            ? subsequentCollection.right.orderIndex
                            : subsequentCollection.right.orderIndex - 1,
                    },
                });
            });
            this.pubsub.publish(`user_coll/${collection.right.userUid}/order_updated`, {
                userCollection: this.cast(collection.right),
                nextUserCollection: this.cast(subsequentCollection.right),
            });
            return E.right(true);
        }
        catch (error) {
            return E.left(errors_1.USER_COLL_REORDERING_FAILED);
        }
    }
    async exportUserCollectionToJSONObject(userUID, collectionID) {
        const collection = await this.getUserCollection(collectionID);
        if (E.isLeft(collection))
            return E.left(collection.left);
        const childCollectionList = await this.prisma.userCollection.findMany({
            where: {
                parentID: collectionID,
                userUid: userUID,
            },
            orderBy: {
                orderIndex: 'asc',
            },
        });
        const childrenCollectionObjects = [];
        for (const coll of childCollectionList) {
            const result = await this.exportUserCollectionToJSONObject(userUID, coll.id);
            if (E.isLeft(result))
                return E.left(result.left);
            childrenCollectionObjects.push(result.right);
        }
        const requests = await this.prisma.userRequest.findMany({
            where: {
                userUid: userUID,
                collectionID,
            },
            orderBy: {
                orderIndex: 'asc',
            },
        });
        const result = {
            id: collection.right.id,
            name: collection.right.title,
            folders: childrenCollectionObjects,
            requests: requests.map((x) => {
                return Object.assign({ id: x.id, name: x.title }, x.request);
            }),
        };
        return E.right(result);
    }
    async exportUserCollectionsToJSON(userUID, collectionID, reqType) {
        const childCollectionList = await this.prisma.userCollection.findMany({
            where: {
                userUid: userUID,
                parentID: collectionID,
                type: reqType,
            },
            orderBy: {
                orderIndex: 'asc',
            },
        });
        const collectionListObjects = [];
        for (const coll of childCollectionList) {
            const result = await this.exportUserCollectionToJSONObject(userUID, coll.id);
            if (E.isLeft(result))
                return E.left(result.left);
            collectionListObjects.push(result.right);
        }
        if (collectionID) {
            const parentCollection = await this.getUserCollection(collectionID);
            if (E.isLeft(parentCollection))
                return E.left(parentCollection.left);
            if (parentCollection.right.type !== reqType)
                return E.left(errors_1.USER_COLL_NOT_SAME_TYPE);
            const requests = await this.prisma.userRequest.findMany({
                where: {
                    userUid: userUID,
                    collectionID: parentCollection.right.id,
                },
                orderBy: {
                    orderIndex: 'asc',
                },
            });
            return E.right({
                exportedCollection: JSON.stringify({
                    id: parentCollection.right.id,
                    name: parentCollection.right.title,
                    folders: collectionListObjects,
                    requests: requests.map((x) => {
                        return Object.assign({ id: x.id, name: x.title }, x.request);
                    }),
                }),
                collectionType: parentCollection.right.type,
            });
        }
        return E.right({
            exportedCollection: JSON.stringify(collectionListObjects),
            collectionType: reqType,
        });
    }
    generatePrismaQueryObj(folder, userID, orderIndex, reqType) {
        return {
            title: folder.name,
            user: {
                connect: {
                    uid: userID,
                },
            },
            requests: {
                create: folder.requests.map((r, index) => ({
                    title: r.name,
                    user: {
                        connect: {
                            uid: userID,
                        },
                    },
                    type: reqType,
                    request: r,
                    orderIndex: index + 1,
                })),
            },
            orderIndex: orderIndex,
            type: reqType,
            children: {
                create: folder.folders.map((f, index) => this.generatePrismaQueryObj(f, userID, index + 1, reqType)),
            },
        };
    }
    async importCollectionsFromJSON(jsonString, userID, destCollectionID, reqType) {
        const collectionsList = (0, utils_1.stringToJson)(jsonString);
        if (E.isLeft(collectionsList))
            return E.left(errors_1.USER_COLL_INVALID_JSON);
        if (!Array.isArray(collectionsList.right))
            return E.left(errors_1.USER_COLL_INVALID_JSON);
        if (destCollectionID) {
            const parentCollection = await this.getUserCollection(destCollectionID);
            if (E.isLeft(parentCollection))
                return E.left(parentCollection.left);
            if (parentCollection.right.userUid !== userID)
                return E.left(errors_1.USER_NOT_OWNER);
            if (parentCollection.right.type !== reqType)
                return E.left(errors_1.USER_COLL_NOT_SAME_TYPE);
        }
        const count = !destCollectionID
            ? await this.getRootCollectionsCount(userID)
            : await this.getChildCollectionsCount(destCollectionID);
        const queryList = collectionsList.right.map((x) => this.generatePrismaQueryObj(x, userID, count + 1, reqType));
        const parent = destCollectionID
            ? {
                connect: {
                    id: destCollectionID,
                },
            }
            : undefined;
        const userCollections = await this.prisma.$transaction(queryList.map((x) => this.prisma.userCollection.create({
            data: Object.assign(Object.assign({}, x), { parent }),
        })));
        userCollections.forEach((x) => this.pubsub.publish(`user_coll/${userID}/created`, x));
        return E.right(true);
    }
};
UserCollectionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        pubsub_service_1.PubSubService])
], UserCollectionService);
exports.UserCollectionService = UserCollectionService;
//# sourceMappingURL=user-collection.service.js.map