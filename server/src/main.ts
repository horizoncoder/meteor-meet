// main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { RolesService } from './roles/roles.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const port = configService.get('PORT') || 3000;

    const rolesService = app.get(RolesService);
    await rolesService.initializeRoles();

    // Настройка CORS
    app.enableCors({
        origin: ['http://localhost:3000', 'http://localhost:8080'],
        credentials: false,
    });

    await app.listen(port);
}

bootstrap();
