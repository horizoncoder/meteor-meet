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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetsController = void 0;
const common_1 = require("@nestjs/common");
const meets_service_1 = require("./meets.service");
const jwt_auth_guard_1 = require("../guard/jwt-auth.guard");
const meet_dto_1 = require("./meet.dto");
let MeetsController = class MeetsController {
    constructor(meetsService) {
        this.meetsService = meetsService;
    }
    async createMeet(req, createMeetDto) {
        const userId = req.user.id;
        return await this.meetsService.createMeet(userId, createMeetDto);
    }
    async getAllMeets(page, limit) {
        const [meets, total, totalPages] = await this.meetsService.getAllMeets(page, limit);
        return {
            data: meets,
            pagination: {
                total,
                totalPages,
                currentPage: page,
            }
        };
    }
    async getAllMeetsByOrganization(page = 1, limit = 10, organizationId) {
        if (!organizationId) {
            throw new common_1.BadRequestException('OrganizationId is required');
        }
        const [meets, total, totalPages] = await this.meetsService.getAllMeetsInOrganization(page, limit, organizationId);
        return {
            data: meets,
            pagination: {
                total,
                totalPages,
                currentPage: Number(page),
            }
        };
    }
};
exports.MeetsController = MeetsController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, meet_dto_1.CreateMeetDto]),
    __metadata("design:returntype", Promise)
], MeetsController.prototype, "createMeet", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/all'),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], MeetsController.prototype, "getAllMeets", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('organizationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], MeetsController.prototype, "getAllMeetsByOrganization", null);
exports.MeetsController = MeetsController = __decorate([
    (0, common_1.Controller)('meet'),
    __metadata("design:paramtypes", [meets_service_1.MeetsService])
], MeetsController);
//# sourceMappingURL=meets.controller.js.map