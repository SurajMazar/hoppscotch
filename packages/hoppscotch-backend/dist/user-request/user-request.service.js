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
exports.UserRequestService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const pubsub_service_1 = require("../pubsub/pubsub.service");
const E = require("fp-ts/Either");
const errors_1 = require("../errors");
const utils_1 = require("../utils");
const RequestTypes_1 = require("../types/RequestTypes");
const user_collection_service_1 = require("../user-collection/user-collection.service");
let UserRequestService = class UserRequestService {
    constructor(prisma, pubsub, userCollectionService) {
        this.prisma = prisma;
        this.pubsub = pubsub;
        this.userCollectionService = userCollectionService;
    }
    cast(dbRequest) {
        return Object.assign(Object.assign({}, dbRequest), { type: RequestTypes_1.ReqType[dbRequest.type], request: JSON.stringify(dbRequest.request) });
    }
    async fetchUserRequests(collectionID, type, cursor, take, user) {
        const dbRequests = await this.prisma.userRequest.findMany({
            where: {
                userUid: user.uid,
                collectionID: collectionID,
                type,
            },
            take: take,
            skip: cursor ? 1 : 0,
            cursor: cursor ? { id: cursor } : undefined,
            orderBy: { orderIndex: 'asc' },
        });
        const userRequests = dbRequests.map((r) => this.cast(r));
        return E.right(userRequests);
    }
    async fetchUserRequest(id, user) {
        const dbRequest = await this.prisma.userRequest.findUnique({
            where: { id },
        });
        if (!dbRequest || dbRequest.userUid !== user.uid) {
            return E.left(errors_1.USER_REQUEST_NOT_FOUND);
        }
        return E.right(this.cast(dbRequest));
    }
    getRequestsCountInCollection(collectionID) {
        return this.prisma.userRequest.count({
            where: { collectionID },
        });
    }
    async createRequest(collectionID, title, request, type, user) {
        const jsonRequest = (0, utils_1.stringToJson)(request);
        if (E.isLeft(jsonRequest))
            return E.left(jsonRequest.left);
        const collection = await this.userCollectionService.getUserCollection(collectionID);
        if (E.isLeft(collection))
            return E.left(collection.left);
        if (collection.right.userUid !== user.uid)
            return E.left(errors_1.USER_COLLECTION_NOT_FOUND);
        if (collection.right.type !== RequestTypes_1.ReqType[type])
            return E.left(errors_1.USER_REQUEST_INVALID_TYPE);
        try {
            const requestCount = await this.getRequestsCountInCollection(collectionID);
            const request = await this.prisma.userRequest.create({
                data: {
                    collectionID,
                    title,
                    request: jsonRequest.right,
                    type: RequestTypes_1.ReqType[type],
                    orderIndex: requestCount + 1,
                    userUid: user.uid,
                },
            });
            const userRequest = this.cast(request);
            await this.pubsub.publish(`user_request/${user.uid}/created`, userRequest);
            return E.right(userRequest);
        }
        catch (err) {
            return E.left(errors_1.USER_REQUEST_CREATION_FAILED);
        }
    }
    async updateRequest(id, title, type, request, user) {
        const existRequest = await this.prisma.userRequest.findFirst({
            where: { id, userUid: user.uid },
        });
        if (!existRequest)
            return E.left(errors_1.USER_REQUEST_NOT_FOUND);
        if (existRequest.type !== RequestTypes_1.ReqType[type])
            return E.left(errors_1.USER_REQUEST_INVALID_TYPE);
        let jsonRequest = undefined;
        if (request) {
            const jsonRequestE = (0, utils_1.stringToJson)(request);
            if (E.isLeft(jsonRequestE))
                return E.left(jsonRequestE.left);
            jsonRequest = jsonRequestE.right;
        }
        const updatedRequest = await this.prisma.userRequest.update({
            where: { id },
            data: {
                title,
                request: jsonRequest,
            },
        });
        const userRequest = this.cast(updatedRequest);
        await this.pubsub.publish(`user_request/${user.uid}/updated`, userRequest);
        return E.right(userRequest);
    }
    async deleteRequest(id, user) {
        const request = await this.prisma.userRequest.findFirst({
            where: { id, userUid: user.uid },
        });
        if (!request)
            return E.left(errors_1.USER_REQUEST_NOT_FOUND);
        await this.prisma.userRequest.updateMany({
            where: {
                collectionID: request.collectionID,
                orderIndex: { gt: request.orderIndex },
            },
            data: { orderIndex: { decrement: 1 } },
        });
        await this.prisma.userRequest.delete({ where: { id } });
        await this.pubsub.publish(`user_request/${user.uid}/deleted`, this.cast(request));
        return E.right(true);
    }
    async moveRequest(srcCollID, destCollID, requestID, nextRequestID, user) {
        const twoRequests = await this.findRequestAndNextRequest(srcCollID, destCollID, requestID, nextRequestID, user);
        if (E.isLeft(twoRequests))
            return twoRequests;
        const { request: dbRequest, nextRequest: dbNextRequest } = twoRequests.right;
        const isTypeValidate = await this.validateTypeEqualityForMoveRequest(srcCollID, destCollID, dbRequest, dbNextRequest);
        if (E.isLeft(isTypeValidate))
            return E.left(isTypeValidate.left);
        const updatedRequest = await this.reorderRequests(srcCollID, dbRequest, destCollID, dbNextRequest);
        if (E.isLeft(updatedRequest))
            return updatedRequest;
        const userRequest = this.cast(updatedRequest.right);
        await this.pubsub.publish(`user_request/${user.uid}/moved`, {
            request: userRequest,
            nextRequest: dbNextRequest ? this.cast(dbNextRequest) : null,
        });
        return E.right(userRequest);
    }
    async validateTypeEqualityForMoveRequest(srcCollID, destCollID, request, nextRequest) {
        const collections = await Promise.all([
            this.userCollectionService.getUserCollection(srcCollID),
            this.userCollectionService.getUserCollection(destCollID),
        ]);
        const srcColl = collections[0];
        if (E.isLeft(srcColl))
            return E.left(srcColl.left);
        const destColl = collections[1];
        if (E.isLeft(destColl))
            return E.left(destColl.left);
        if (srcColl.right.type !== destColl.right.type ||
            (nextRequest && request.type !== nextRequest.type)) {
            return E.left(errors_1.USER_REQUEST_INVALID_TYPE);
        }
        return E.right(true);
    }
    async findRequestAndNextRequest(srcCollID, destCollID, requestID, nextRequestID, user) {
        const request = await this.prisma.userRequest.findFirst({
            where: { id: requestID, collectionID: srcCollID, userUid: user.uid },
        });
        if (!request)
            return E.left(errors_1.USER_REQUEST_NOT_FOUND);
        let nextRequest = null;
        if (nextRequestID) {
            nextRequest = await this.prisma.userRequest.findFirst({
                where: {
                    id: nextRequestID,
                    collectionID: destCollID,
                    userUid: user.uid,
                },
            });
            if (!nextRequest)
                return E.left(errors_1.USER_REQUEST_NOT_FOUND);
        }
        return E.right({ request, nextRequest });
    }
    async reorderRequests(srcCollID, request, destCollID, nextRequest) {
        try {
            return await this.prisma.$transaction(async (tx) => {
                const isSameCollection = srcCollID === destCollID;
                const isMovingUp = (nextRequest === null || nextRequest === void 0 ? void 0 : nextRequest.orderIndex) < request.orderIndex;
                const nextReqOrderIndex = nextRequest === null || nextRequest === void 0 ? void 0 : nextRequest.orderIndex;
                const reqCountInDestColl = nextRequest
                    ? undefined
                    : await this.getRequestsCountInCollection(destCollID);
                if (isSameCollection) {
                    const updateFrom = isMovingUp
                        ? nextReqOrderIndex
                        : request.orderIndex + 1;
                    const updateTo = isMovingUp ? request.orderIndex : nextReqOrderIndex;
                    await tx.userRequest.updateMany({
                        where: {
                            collectionID: srcCollID,
                            orderIndex: { gte: updateFrom, lt: updateTo },
                        },
                        data: {
                            orderIndex: isMovingUp ? { increment: 1 } : { decrement: 1 },
                        },
                    });
                }
                else {
                    await tx.userRequest.updateMany({
                        where: {
                            collectionID: srcCollID,
                            orderIndex: { gte: request.orderIndex },
                        },
                        data: { orderIndex: { decrement: 1 } },
                    });
                    if (nextRequest) {
                        await tx.userRequest.updateMany({
                            where: {
                                collectionID: destCollID,
                                orderIndex: { gte: nextReqOrderIndex },
                            },
                            data: { orderIndex: { increment: 1 } },
                        });
                    }
                }
                let adjust;
                if (isSameCollection)
                    adjust = nextRequest ? (isMovingUp ? 0 : -1) : 0;
                else
                    adjust = nextRequest ? 0 : 1;
                const newOrderIndex = (nextReqOrderIndex !== null && nextReqOrderIndex !== void 0 ? nextReqOrderIndex : reqCountInDestColl) + adjust;
                const updatedRequest = await tx.userRequest.update({
                    where: { id: request.id },
                    data: { orderIndex: newOrderIndex, collectionID: destCollID },
                });
                return E.right(updatedRequest);
            });
        }
        catch (err) {
            return E.left(errors_1.USER_REQUEST_REORDERING_FAILED);
        }
    }
};
UserRequestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        pubsub_service_1.PubSubService,
        user_collection_service_1.UserCollectionService])
], UserRequestService);
exports.UserRequestService = UserRequestService;
//# sourceMappingURL=user-request.service.js.map