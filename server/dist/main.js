"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const roles_service_1 = require("./roles/roles.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('PORT') || 3000;
    const rolesService = app.get(roles_service_1.RolesService);
    await rolesService.initializeRoles();
    app.enableCors({
        origin: ['http://localhost:3000', 'http://localhost:8080'],
        credentials: false,
    });
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map