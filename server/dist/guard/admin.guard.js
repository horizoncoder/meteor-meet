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
exports.AdminGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
let AdminGuard = class AdminGuard {
    constructor(reflector, jwtService) {
        this.reflector = reflector;
        this.jwtService = jwtService;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            throw new common_1.ForbiddenException('Missing Authorization header');
        }
        const token = this.extractToken(authHeader);
        if (!token) {
            throw new common_1.ForbiddenException('Invalid Authorization header format');
        }
        const decodedToken = this.verifyToken(token);
        if (!decodedToken || decodedToken.roleId !== 1) {
            throw new common_1.ForbiddenException('You do not have permission to perform this action.');
        }
        return true;
    }
    extractToken(authHeader) {
        if (!authHeader) {
            return null;
        }
        const [bearer, token] = authHeader.split(' ');
        if (bearer.toLowerCase() !== 'bearer' || !token) {
            return null;
        }
        return token;
    }
    verifyToken(token) {
        try {
            return this.jwtService.verify(token);
        }
        catch (error) {
            throw new common_1.ForbiddenException('Invalid token');
        }
    }
};
exports.AdminGuard = AdminGuard;
exports.AdminGuard = AdminGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        jwt_1.JwtService])
], AdminGuard);
//# sourceMappingURL=admin.guard.js.map