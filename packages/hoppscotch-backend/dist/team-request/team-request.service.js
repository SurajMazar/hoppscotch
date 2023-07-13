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
exports.TeamRequestService = void 0;
const common_1 = require("@nestjs/common");
const team_service_1 = require("../team/team.service");
const prisma_service_1 = require("../prisma/prisma.service");
const team_collection_service_1 = require("../team-collection/team-collection.service");
const errors_1 = require("../errors");
const pubsub_service_1 = require("../pubsub/pubsub.service");
const utils_1 = require("../utils");
const E = require("fp-ts/Either");
const O = require("fp-ts/Option");
let TeamRequestService = class TeamRequestService {
    constructor(prisma, teamService, teamCollectionService, pubsub) {
        this.prisma = prisma;
        this.teamService = teamService;
        this.teamCollectionService = teamCollectionService;
        this.pubsub = pubsub;
    }
    cast(tr) {
        return {
            id: tr.id,
            collectionID: tr.collectionID,
            teamID: tr.teamID,
            title: tr.title,
            request: JSON.stringify(tr.request),
        };
    }
    async updateTeamRequest(requestID, title, request) {
        try {
            const updateInput = { title };
            if (request) {
                const jsonReq = (0, utils_1.stringToJson)(request);
                if (E.isLeft(jsonReq))
                    return E.left(jsonReq.left);
                updateInput.request = jsonReq.right;
            }
            const updatedTeamReq = await this.prisma.teamRequest.update({
                where: { id: requestID },
                data: updateInput,
            });
            const teamRequest = this.cast(updatedTeamReq);
            this.pubsub.publish(`team_req/${teamRequest.teamID}/req_updated`, teamRequest);
            return E.right(teamRequest);
        }
        catch (e) {
            return E.left(errors_1.TEAM_REQ_NOT_FOUND);
        }
    }
    async searchRequest(teamID, searchTerm, cursor, take = 10) {
        const fetchedRequests = await this.prisma.teamRequest.findMany({
            take: take,
            skip: cursor ? 1 : 0,
            cursor: cursor ? { id: cursor } : undefined,
            where: {
                teamID: teamID,
                title: {
                    contains: searchTerm,
                },
            },
        });
        const teamRequests = fetchedRequests.map((tr) => this.cast(tr));
        return teamRequests;
    }
    async deleteTeamRequest(requestID) {
        const dbTeamReq = await this.prisma.teamRequest.findFirst({
            where: { id: requestID },
        });
        if (!dbTeamReq)
            return E.left(errors_1.TEAM_REQ_NOT_FOUND);
        await this.prisma.teamRequest.updateMany({
            where: { orderIndex: { gte: dbTeamReq.orderIndex } },
            data: { orderIndex: { decrement: 1 } },
        });
        await this.prisma.teamRequest.delete({
            where: { id: requestID },
        });
        this.pubsub.publish(`team_req/${dbTeamReq.teamID}/req_deleted`, requestID);
        return E.right(true);
    }
    async createTeamRequest(collectionID, teamID, title, request) {
        const team = await this.teamCollectionService.getTeamOfCollection(collectionID);
        if (E.isLeft(team))
            return E.left(team.left);
        if (team.right.id !== teamID)
            return E.left(errors_1.TEAM_INVALID_ID);
        const reqCountInColl = await this.getRequestsCountInCollection(collectionID);
        const createInput = {
            request: request,
            title: title,
            orderIndex: reqCountInColl + 1,
            team: { connect: { id: team.right.id } },
            collection: { connect: { id: collectionID } },
        };
        if (request) {
            const jsonReq = (0, utils_1.stringToJson)(request);
            if (E.isLeft(jsonReq))
                return E.left(jsonReq.left);
            createInput.request = jsonReq.right;
        }
        const dbTeamRequest = await this.prisma.teamRequest.create({
            data: createInput,
        });
        const teamRequest = this.cast(dbTeamRequest);
        this.pubsub.publish(`team_req/${teamRequest.teamID}/req_created`, teamRequest);
        return E.right(teamRequest);
    }
    async getRequestsInCollection(collectionID, cursor, take = 10) {
        const dbTeamRequests = await this.prisma.teamRequest.findMany({
            cursor: cursor ? { id: cursor } : undefined,
            take: take,
            skip: cursor ? 1 : 0,
            where: {
                collectionID: collectionID,
            },
        });
        const teamRequests = dbTeamRequests.map((tr) => this.cast(tr));
        return teamRequests;
    }
    async getRequest(reqID) {
        try {
            const teamRequest = await this.prisma.teamRequest.findUnique({
                where: { id: reqID },
            });
            return O.some(this.cast(teamRequest));
        }
        catch (e) {
            return O.none;
        }
    }
    async getTeamOfRequest(req) {
        const team = await this.teamService.getTeamWithID(req.teamID);
        if (!team)
            return E.left(errors_1.TEAM_INVALID_ID);
        return E.right(team);
    }
    async getCollectionOfRequest(req) {
        const teamCollection = await this.teamCollectionService.getCollection(req.collectionID);
        if (E.isLeft(teamCollection))
            return E.left(errors_1.TEAM_INVALID_COLL_ID);
        return E.right(teamCollection.right);
    }
    async getTeamOfRequestFromID(reqID) {
        const teamRequest = await this.prisma.teamRequest.findUnique({
            where: { id: reqID },
            include: { team: true },
        });
        if (!(teamRequest === null || teamRequest === void 0 ? void 0 : teamRequest.team))
            return O.none;
        return O.some(teamRequest.team);
    }
    async moveRequest(srcCollID, requestID, destCollID, nextRequestID, callerFunction) {
        const twoRequests = await this.findRequestAndNextRequest(srcCollID, requestID, destCollID, nextRequestID);
        if (E.isLeft(twoRequests))
            return E.left(twoRequests.left);
        const { request, nextRequest } = twoRequests.right;
        if (!srcCollID)
            srcCollID = request.collectionID;
        const updatedRequest = await this.reorderRequests(request, srcCollID, nextRequest, destCollID);
        if (E.isLeft(updatedRequest))
            return E.left(updatedRequest.left);
        const teamReq = this.cast(updatedRequest.right);
        if (callerFunction === 'moveRequest') {
            this.pubsub.publish(`team_req/${teamReq.teamID}/req_moved`, teamReq);
        }
        else if (callerFunction === 'updateLookUpRequestOrder') {
            this.pubsub.publish(`team_req/${request.teamID}/req_order_updated`, {
                request: this.cast(updatedRequest.right),
                nextRequest: nextRequest ? this.cast(nextRequest) : null,
            });
        }
        return E.right(teamReq);
    }
    async findRequestAndNextRequest(srcCollID, requestID, destCollID, nextRequestID) {
        const request = await this.prisma.teamRequest.findFirst({
            where: { id: requestID, collectionID: srcCollID },
        });
        if (!request)
            return E.left(errors_1.TEAM_REQ_NOT_FOUND);
        let nextRequest = null;
        if (nextRequestID) {
            nextRequest = await this.prisma.teamRequest.findFirst({
                where: { id: nextRequestID },
            });
            if (!nextRequest)
                return E.left(errors_1.TEAM_REQ_NOT_FOUND);
            if (nextRequest.collectionID !== destCollID ||
                request.teamID !== nextRequest.teamID) {
                return E.left(errors_1.TEAM_REQ_INVALID_TARGET_COLL_ID);
            }
        }
        return E.right({ request, nextRequest });
    }
    async getRequestsCountInCollection(collectionID) {
        return this.prisma.teamRequest.count({
            where: { collectionID },
        });
    }
    async reorderRequests(request, srcCollID, nextRequest, destCollID) {
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
                    await tx.teamRequest.updateMany({
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
                    await tx.teamRequest.updateMany({
                        where: {
                            collectionID: srcCollID,
                            orderIndex: { gte: request.orderIndex },
                        },
                        data: { orderIndex: { decrement: 1 } },
                    });
                    if (nextRequest) {
                        await tx.teamRequest.updateMany({
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
                const updatedRequest = await tx.teamRequest.update({
                    where: { id: request.id },
                    data: { orderIndex: newOrderIndex, collectionID: destCollID },
                });
                return E.right(updatedRequest);
            });
        }
        catch (err) {
            return E.left(errors_1.TEAM_REQ_REORDERING_FAILED);
        }
    }
    async totalRequestsInATeam(teamID) {
        const requestsCount = await this.prisma.teamRequest.count({
            where: {
                teamID: teamID,
            },
        });
        return requestsCount;
    }
    async getTeamRequestsCount() {
        const teamRequestsCount = this.prisma.teamRequest.count();
        return teamRequestsCount;
    }
};
TeamRequestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        team_service_1.TeamService,
        team_collection_service_1.TeamCollectionService,
        pubsub_service_1.PubSubService])
], TeamRequestService);
exports.TeamRequestService = TeamRequestService;
//# sourceMappingURL=team-request.service.js.map