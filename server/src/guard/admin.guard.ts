// admin.guard.ts

import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService,
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new ForbiddenException('Missing Authorization header');
        }

        const token = this.extractToken(authHeader);

        if (!token) {
            throw new ForbiddenException('Invalid Authorization header format');
        }

        const decodedToken = this.verifyToken(token);


        if (!decodedToken || decodedToken.roleId !== 1) {
            throw new ForbiddenException('You do not have permission to perform this action.');
        }

        return true;
    }

    private extractToken(authHeader: string): string | null {
        if (!authHeader) {
            return null;
        }

        const [bearer, token] = authHeader.split(' ');

        if (bearer.toLowerCase() !== 'bearer' || !token) {
            return null;
        }

        return token;
    }

    private verifyToken(token: string): any {
        try {
            return this.jwtService.verify(token);
        } catch (error) {
            throw new ForbiddenException('Invalid token');
        }
    }
}
