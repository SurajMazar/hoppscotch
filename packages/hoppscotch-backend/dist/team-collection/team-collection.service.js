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
exports.TeamCollectionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const errors_1 = require("../errors");
const pubsub_service_1 = require("../pubsub/pubsub.service");
const utils_1 = require("../utils");
const E = require("fp-ts/Either");
const O = require("fp-ts/Option");
const utils_2 = require("../utils");
let TeamCollectionService = class TeamCollectionService {
    constructor(prisma, pubsub) {
        this.prisma = prisma;
        this.pubsub = pubsub;
        this.TITLE_LENGTH = 3;
    }
    generatePrismaQueryObjForFBCollFolder(folder, teamID, orderIndex) {
        return {
            title: folder.name,
            team: {
                connect: {
                    id: teamID,
                },
            },
            requests: {
                create: folder.requests.map((r, index) => ({
                    title: r.name,
                    team: {
                        connect: {
                            id: teamID,
                        },
                    },
                    request: r,
                    orderIndex: index + 1,
                })),
            },
            orderIndex: orderIndex,
            children: {
                create: folder.folders.map((f, index) => this.generatePrismaQueryObjForFBCollFolder(f, teamID, index + 1)),
            },
        };
    }
    async exportCollectionToJSONObject(teamID, collectionID) {
        const collection = await this.getCollection(collectionID);
        if (E.isLeft(collection))
            return E.left(errors_1.TEAM_INVALID_COLL_ID);
        const childrenCollection = await this.prisma.teamCollection.findMany({
            where: {
                teamID,
                parentID: collectionID,
            },
            orderBy: {
                orderIndex: 'asc',
            },
        });
        const childrenCollectionObjects = [];
        for (const coll of childrenCollection) {
            const result = await this.exportCollectionToJSONObject(teamID, coll.id);
            if (E.isLeft(result))
                return E.left(result.left);
            childrenCollectionObjects.push(result.right);
        }
        const requests = await this.prisma.teamRequest.findMany({
            where: {
                teamID,
                collectionID,
            },
            orderBy: {
                orderIndex: 'asc',
            },
        });
        const result = {
            name: collection.right.title,
            folders: childrenCollectionObjects,
            requests: requests.map((x) => x.request),
        };
        return E.right(result);
    }
    async exportCollectionsToJSON(teamID) {
        const rootCollections = await this.prisma.teamCollection.findMany({
            where: {
                teamID,
                parentID: null,
            },
        });
        const rootCollectionObjects = [];
        for (const coll of rootCollections) {
            const result = await this.exportCollectionToJSONObject(teamID, coll.id);
            if (E.isLeft(result))
                return E.left(result.left);
            rootCollectionObjects.push(result.right);
        }
        return E.right(JSON.stringify(rootCollectionObjects));
    }
    async importCollectionsFromJSON(jsonString, destTeamID, destCollectionID) {
        const collectionsList = (0, utils_2.stringToJson)(jsonString);
        if (E.isLeft(collectionsList))
            return E.left(errors_1.TEAM_COLL_INVALID_JSON);
        if (!Array.isArray(collectionsList.right))
            return E.left(errors_1.TEAM_COLL_INVALID_JSON);
        const count = !destCollectionID
            ? await this.getRootCollectionsCount(destTeamID)
            : await this.getChildCollectionsCount(destCollectionID);
        const queryList = collectionsList.right.map((x) => this.generatePrismaQueryObjForFBCollFolder(x, destTeamID, count + 1));
        const parent = destCollectionID
            ? {
                connect: {
                    id: destCollectionID,
                },
            }
            : undefined;
        const teamCollections = await this.prisma.$transaction(queryList.map((x) => this.prisma.teamCollection.create({
            data: Object.assign(Object.assign({}, x), { parent }),
        })));
        teamCollections.forEach((x) => this.pubsub.publish(`team_coll/${destTeamID}/coll_added`, x));
        return E.right(true);
    }
    async replaceCollectionsWithJSON(jsonString, destTeamID, destCollectionID) {
        const collectionsList = (0, utils_2.stringToJson)(jsonString);
        if (E.isLeft(collectionsList))
            return E.left(errors_1.TEAM_COLL_INVALID_JSON);
        if (!Array.isArray(collectionsList.right))
            return E.left(errors_1.TEAM_COLL_INVALID_JSON);
        const childrenCollection = await this.prisma.teamCollection.findMany({
            where: {
                teamID: destTeamID,
                parentID: destCollectionID,
            },
        });
        for (const coll of childrenCollection) {
            const deletedTeamCollection = await this.deleteCollection(coll.id);
            if (E.isLeft(deletedTeamCollection))
                return E.left(deletedTeamCollection.left);
        }
        const count = !destCollectionID
            ? await this.getRootCollectionsCount(destTeamID)
            : await this.getChildCollectionsCount(destCollectionID);
        const queryList = collectionsList.right.map((x) => this.generatePrismaQueryObjForFBCollFolder(x, destTeamID, count + 1));
        const parent = destCollectionID
            ? {
                connect: {
                    id: destCollectionID,
                },
            }
            : undefined;
        const teamCollections = await this.prisma.$transaction(queryList.map((x) => this.prisma.teamCollection.create({
            data: Object.assign(Object.assign({}, x), { parent }),
        })));
        teamCollections.forEach((x) => this.pubsub.publish(`team_coll/${destTeamID}/coll_added`, x));
        return E.right(true);
    }
    cast(teamCollection) {
        return Object.assign({}, teamCollection);
    }
    async getTeamOfCollection(collectionID) {
        try {
            const teamCollection = await this.prisma.teamCollection.findUnique({
                where: {
                    id: collectionID,
                },
                include: {
                    team: true,
                },
            });
            return E.right(teamCollection.team);
        }
        catch (error) {
            return E.left(errors_1.TEAM_INVALID_COLL_ID);
        }
    }
    async getParentOfCollection(collectionID) {
        const teamCollection = await this.prisma.teamCollection.findUnique({
            where: {
                id: collectionID,
            },
            include: {
                parent: true,
            },
        });
        if (!teamCollection)
            return null;
        return teamCollection.parent;
    }
    getChildrenOfCollection(collectionID, cursor, take) {
        return this.prisma.teamCollection.findMany({
            where: {
                parentID: collectionID,
            },
            orderBy: {
                orderIndex: 'asc',
            },
            take: take,
            skip: cursor ? 1 : 0,
            cursor: cursor ? { id: cursor } : undefined,
        });
    }
    async getTeamRootCollections(teamID, cursor, take) {
        return this.prisma.teamCollection.findMany({
            where: {
                teamID,
                parentID: null,
            },
            orderBy: {
                orderIndex: 'asc',
            },
            take: take,
            skip: cursor ? 1 : 0,
            cursor: cursor ? { id: cursor } : undefined,
        });
    }
    async getCollection(collectionID) {
        try {
            const teamCollection = await this.prisma.teamCollection.findUniqueOrThrow({
                where: {
                    id: collectionID,
                },
            });
            return E.right(teamCollection);
        }
        catch (error) {
            return E.left(errors_1.TEAM_COLL_NOT_FOUND);
        }
    }
    async isOwnerCheck(collectionID, teamID) {
        try {
            await this.prisma.teamCollection.findFirstOrThrow({
                where: {
                    id: collectionID,
                    teamID,
                },
            });
            return O.some(true);
        }
        catch (error) {
            return O.none;
        }
    }
    async getChildCollectionsCount(collectionID) {
        const childCollectionCount = await this.prisma.teamCollection.findMany({
            where: { parentID: collectionID },
            orderBy: {
                orderIndex: 'desc',
            },
        });
        if (!childCollectionCount.length)
            return 0;
        return childCollectionCount[0].orderIndex;
    }
    async getRootCollectionsCount(teamID) {
        const rootCollectionCount = await this.prisma.teamCollection.findMany({
            where: { teamID, parentID: null },
            orderBy: {
                orderIndex: 'desc',
            },
        });
        if (!rootCollectionCount.length)
            return 0;
        return rootCollectionCount[0].orderIndex;
    }
    async createCollection(teamID, title, parentTeamCollectionID) {
        const isTitleValid = (0, utils_1.isValidLength)(title, this.TITLE_LENGTH);
        if (!isTitleValid)
            return E.left(errors_1.TEAM_COLL_SHORT_TITLE);
        if (parentTeamCollectionID !== null) {
            const isOwner = await this.isOwnerCheck(parentTeamCollectionID, teamID);
            if (O.isNone(isOwner))
                return E.left(errors_1.TEAM_NOT_OWNER);
        }
        const isParent = parentTeamCollectionID
            ? {
                connect: {
                    id: parentTeamCollectionID,
                },
            }
            : undefined;
        const teamCollection = await this.prisma.teamCollection.create({
            data: {
                title: title,
                team: {
                    connect: {
                        id: teamID,
                    },
                },
                parent: isParent,
                orderIndex: !parentTeamCollectionID
                    ? (await this.getRootCollectionsCount(teamID)) + 1
                    : (await this.getChildCollectionsCount(parentTeamCollectionID)) + 1,
            },
        });
        this.pubsub.publish(`team_coll/${teamID}/coll_added`, teamCollection);
        return E.right(this.cast(teamCollection));
    }
    async renameCollection(collectionID, newTitle) {
        const isTitleValid = (0, utils_1.isValidLength)(newTitle, this.TITLE_LENGTH);
        if (!isTitleValid)
            return E.left(errors_1.TEAM_COLL_SHORT_TITLE);
        try {
            const updatedTeamCollection = await this.prisma.teamCollection.update({
                where: {
                    id: collectionID,
                },
                data: {
                    title: newTitle,
                },
            });
            this.pubsub.publish(`team_coll/${updatedTeamCollection.teamID}/coll_updated`, updatedTeamCollection);
            return E.right(updatedTeamCollection);
        }
        catch (error) {
            return E.left(errors_1.TEAM_COLL_NOT_FOUND);
        }
    }
    async updateOrderIndex(parentID, orderIndexCondition, dataCondition) {
        const updatedTeamCollection = await this.prisma.teamCollection.updateMany({
            where: {
                parentID: parentID,
                orderIndex: orderIndexCondition,
            },
            data: { orderIndex: dataCondition },
        });
        return updatedTeamCollection;
    }
    async removeTeamCollection(collectionID) {
        try {
            const deletedTeamCollection = await this.prisma.teamCollection.delete({
                where: {
                    id: collectionID,
                },
            });
            return E.right(deletedTeamCollection);
        }
        catch (error) {
            return E.left(errors_1.TEAM_COLL_NOT_FOUND);
        }
    }
    async deleteCollectionData(collection) {
        const childCollectionList = await this.prisma.teamCollection.findMany({
            where: {
                parentID: collection.id,
            },
        });
        await Promise.all(childCollectionList.map((coll) => this.deleteCollection(coll.id)));
        await this.prisma.teamRequest.deleteMany({
            where: {
                collectionID: collection.id,
            },
        });
        const deletedTeamCollection = await this.removeTeamCollection(collection.id);
        if (E.isLeft(deletedTeamCollection))
            return E.left(deletedTeamCollection.left);
        this.pubsub.publish(`team_coll/${deletedTeamCollection.right.teamID}/coll_removed`, deletedTeamCollection.right.id);
        return E.right(deletedTeamCollection.right);
    }
    async deleteCollection(collectionID) {
        const collection = await this.getCollection(collectionID);
        if (E.isLeft(collection))
            return E.left(collection.left);
        const collectionData = await this.deleteCollectionData(collection.right);
        if (E.isLeft(collectionData))
            return E.left(collectionData.left);
        await this.updateOrderIndex(collectionData.right.parentID, { gt: collectionData.right.orderIndex }, { decrement: 1 });
        return E.right(true);
    }
    async changeParent(collection, parentCollectionID) {
        try {
            let collectionCount;
            if (!parentCollectionID)
                collectionCount = await this.getRootCollectionsCount(collection.teamID);
            collectionCount = await this.getChildCollectionsCount(parentCollectionID);
            const updatedCollection = await this.prisma.teamCollection.update({
                where: {
                    id: collection.id,
                },
                data: {
                    parentID: parentCollectionID,
                    orderIndex: collectionCount + 1,
                },
            });
            return E.right(this.cast(updatedCollection));
        }
        catch (error) {
            return E.left(errors_1.TEAM_COLL_NOT_FOUND);
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
            const parentCollection = await this.getCollection(destCollection.parentID);
            if (E.isLeft(parentCollection)) {
                return O.none;
            }
            return await this.isParent(collection, parentCollection.right);
        }
        else {
            return O.some(true);
        }
    }
    async moveCollection(collectionID, destCollectionID) {
        const collection = await this.getCollection(collectionID);
        if (E.isLeft(collection))
            return E.left(collection.left);
        if (!destCollectionID) {
            if (!collection.right.parentID) {
                return E.left(errors_1.TEAM_COL_ALREADY_ROOT);
            }
            await this.updateOrderIndex(collection.right.parentID, { gt: collection.right.orderIndex }, { decrement: 1 });
            const updatedCollection = await this.changeParent(collection.right, null);
            if (E.isLeft(updatedCollection))
                return E.left(updatedCollection.left);
            this.pubsub.publish(`team_coll/${collection.right.teamID}/coll_moved`, updatedCollection.right);
            return E.right(updatedCollection.right);
        }
        if (collectionID === destCollectionID) {
            return E.left(errors_1.TEAM_COLL_DEST_SAME);
        }
        const destCollection = await this.getCollection(destCollectionID);
        if (E.isLeft(destCollection))
            return E.left(errors_1.TEAM_COLL_NOT_FOUND);
        if (collection.right.teamID !== destCollection.right.teamID) {
            return E.left(errors_1.TEAM_COLL_NOT_SAME_TEAM);
        }
        const checkIfParent = await this.isParent(collection.right, destCollection.right);
        if (O.isNone(checkIfParent)) {
            return E.left(errors_1.TEAM_COLL_IS_PARENT_COLL);
        }
        await this.updateOrderIndex(collection.right.parentID, { gt: collection.right.orderIndex }, { decrement: 1 });
        const updatedCollection = await this.changeParent(collection.right, destCollection.right.id);
        if (E.isLeft(updatedCollection))
            return E.left(updatedCollection.left);
        this.pubsub.publish(`team_coll/${collection.right.teamID}/coll_moved`, updatedCollection.right);
        return E.right(updatedCollection.right);
    }
    getCollectionCount(collectionID) {
        return this.prisma.teamCollection.count({
            where: { parentID: collectionID },
        });
    }
    async updateCollectionOrder(collectionID, nextCollectionID) {
        if (collectionID === nextCollectionID)
            return E.left(errors_1.TEAM_COL_SAME_NEXT_COLL);
        const collection = await this.getCollection(collectionID);
        if (E.isLeft(collection))
            return E.left(collection.left);
        if (!nextCollectionID) {
            try {
                await this.prisma.$transaction(async (tx) => {
                    await tx.teamCollection.updateMany({
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
                    const updatedTeamCollection = await tx.teamCollection.update({
                        where: { id: collection.right.id },
                        data: {
                            orderIndex: await this.getCollectionCount(collection.right.parentID),
                        },
                    });
                });
                this.pubsub.publish(`team_coll/${collection.right.teamID}/coll_order_updated`, {
                    collection: this.cast(collection.right),
                    nextCollection: null,
                });
                return E.right(true);
            }
            catch (error) {
                return E.left(errors_1.TEAM_COL_REORDERING_FAILED);
            }
        }
        const subsequentCollection = await this.getCollection(nextCollectionID);
        if (E.isLeft(subsequentCollection))
            return E.left(errors_1.TEAM_COLL_NOT_FOUND);
        if (collection.right.teamID !== subsequentCollection.right.teamID)
            return E.left(errors_1.TEAM_COLL_NOT_SAME_TEAM);
        try {
            await this.prisma.$transaction(async (tx) => {
                const isMovingUp = subsequentCollection.right.orderIndex < collection.right.orderIndex;
                const updateFrom = isMovingUp
                    ? subsequentCollection.right.orderIndex
                    : collection.right.orderIndex + 1;
                const updateTo = isMovingUp
                    ? collection.right.orderIndex - 1
                    : subsequentCollection.right.orderIndex - 1;
                await tx.teamCollection.updateMany({
                    where: {
                        parentID: collection.right.parentID,
                        orderIndex: { gte: updateFrom, lte: updateTo },
                    },
                    data: {
                        orderIndex: isMovingUp ? { increment: 1 } : { decrement: 1 },
                    },
                });
                const updatedTeamCollection = await tx.teamCollection.update({
                    where: { id: collection.right.id },
                    data: {
                        orderIndex: isMovingUp
                            ? subsequentCollection.right.orderIndex
                            : subsequentCollection.right.orderIndex - 1,
                    },
                });
            });
            this.pubsub.publish(`team_coll/${collection.right.teamID}/coll_order_updated`, {
                collection: this.cast(collection.right),
                nextCollection: this.cast(subsequentCollection.right),
            });
            return E.right(true);
        }
        catch (error) {
            return E.left(errors_1.TEAM_COL_REORDERING_FAILED);
        }
    }
    async totalCollectionsInTeam(teamID) {
        const collCount = await this.prisma.teamCollection.count({
            where: {
                teamID: teamID,
            },
        });
        return collCount;
    }
    async getTeamCollectionsCount() {
        const teamCollectionsCount = this.prisma.teamCollection.count();
        return teamCollectionsCount;
    }
};
TeamCollectionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        pubsub_service_1.PubSubService])
], TeamCollectionService);
exports.TeamCollectionService = TeamCollectionService;
//# sourceMappingURL=team-collection.service.js.map