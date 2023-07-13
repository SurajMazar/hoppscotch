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
exports.UserHistoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const pubsub_service_1 = require("../pubsub/pubsub.service");
const RequestTypes_1 = require("../types/RequestTypes");
const E = require("fp-ts/Either");
const O = require("fp-ts/Option");
const errors_1 = require("../errors");
let UserHistoryService = class UserHistoryService {
    constructor(prisma, pubsub) {
        this.prisma = prisma;
        this.pubsub = pubsub;
    }
    async fetchUserHistory(uid, take, reqType) {
        const userHistory = await this.prisma.userHistory.findMany({
            where: {
                userUid: uid,
                reqType: reqType,
            },
            take: take,
            orderBy: {
                executedOn: 'desc',
            },
        });
        const userHistoryColl = userHistory.map((history) => (Object.assign(Object.assign({}, history), { request: JSON.stringify(history.request), responseMetadata: JSON.stringify(history.responseMetadata) })));
        return userHistoryColl;
    }
    async createUserHistory(uid, reqData, resMetadata, reqType) {
        const requestType = this.validateReqType(reqType);
        if (E.isLeft(requestType))
            return E.left(requestType.left);
        const history = await this.prisma.userHistory.create({
            data: {
                userUid: uid,
                request: JSON.parse(reqData),
                responseMetadata: JSON.parse(resMetadata),
                reqType: requestType.right,
                isStarred: false,
            },
        });
        const userHistory = Object.assign(Object.assign({}, history), { reqType: history.reqType, request: JSON.stringify(history.request), responseMetadata: JSON.stringify(history.responseMetadata) });
        await this.pubsub.publish(`user_history/${userHistory.userUid}/created`, userHistory);
        return E.right(userHistory);
    }
    async toggleHistoryStarStatus(uid, id) {
        const userHistory = await this.fetchUserHistoryByID(id);
        if (O.isNone(userHistory)) {
            return E.left(errors_1.USER_HISTORY_NOT_FOUND);
        }
        try {
            const updatedHistory = await this.prisma.userHistory.update({
                where: {
                    id: id,
                },
                data: {
                    isStarred: !userHistory.value.isStarred,
                },
            });
            const updatedUserHistory = Object.assign(Object.assign({}, updatedHistory), { request: JSON.stringify(updatedHistory.request), responseMetadata: JSON.stringify(updatedHistory.responseMetadata) });
            await this.pubsub.publish(`user_history/${updatedUserHistory.userUid}/updated`, updatedUserHistory);
            return E.right(updatedUserHistory);
        }
        catch (e) {
            return E.left(errors_1.USER_HISTORY_NOT_FOUND);
        }
    }
    async removeRequestFromHistory(uid, id) {
        try {
            const delUserHistory = await this.prisma.userHistory.delete({
                where: {
                    id: id,
                },
            });
            const deletedUserHistory = Object.assign(Object.assign({}, delUserHistory), { request: JSON.stringify(delUserHistory.request), responseMetadata: JSON.stringify(delUserHistory.responseMetadata) });
            await this.pubsub.publish(`user_history/${deletedUserHistory.userUid}/deleted`, deletedUserHistory);
            return E.right(deletedUserHistory);
        }
        catch (e) {
            return E.left(errors_1.USER_HISTORY_NOT_FOUND);
        }
    }
    async deleteAllUserHistory(uid, reqType) {
        const requestType = this.validateReqType(reqType);
        if (E.isLeft(requestType))
            return E.left(requestType.left);
        const deletedCount = await this.prisma.userHistory.deleteMany({
            where: {
                userUid: uid,
                reqType: requestType.right,
            },
        });
        const deletionInfo = {
            count: deletedCount.count,
            reqType: requestType.right,
        };
        await this.pubsub.publish(`user_history/${uid}/deleted_many`, deletionInfo);
        return E.right(deletionInfo);
    }
    async fetchUserHistoryByID(id) {
        const userHistory = await this.prisma.userHistory.findFirst({
            where: {
                id: id,
            },
        });
        if (userHistory == null)
            return O.none;
        return O.some(userHistory);
    }
    validateReqType(reqType) {
        if (reqType == RequestTypes_1.ReqType.REST)
            return E.right(RequestTypes_1.ReqType.REST);
        else if (reqType == RequestTypes_1.ReqType.GQL)
            return E.right(RequestTypes_1.ReqType.GQL);
        return E.left(errors_1.USER_HISTORY_INVALID_REQ_TYPE);
    }
};
UserHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        pubsub_service_1.PubSubService])
], UserHistoryService);
exports.UserHistoryService = UserHistoryService;
//# sourceMappingURL=user-history.service.js.map