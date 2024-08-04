"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_service_1 = require("./user.service");
const user_resolver_1 = require("../../graphql/resolvers/user.resolver");
const user_repository_1 = require("../../database/repositories/user.repository");
const userSetting_service_1 = require("./userSetting.service");
const userSetting_repository_1 = require("../../database/repositories/userSetting.repository");
const userSettings_resolver_1 = require("../../graphql/resolvers/userSettings.resolver");
const user_entity_1 = require("../../database/entities/user.entity");
const userSetting_entity_1 = require("../../database/entities/userSetting.entity");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.UserEntity, userSetting_entity_1.UserSettingEntity, user_repository_1.UserRepository, userSetting_repository_1.UserSettingRepository
            ])],
        providers: [
            user_service_1.UserService,
            user_resolver_1.UserResolver,
            userSetting_service_1.UserSettingService,
            userSettings_resolver_1.UserSettingsResolver
        ],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map