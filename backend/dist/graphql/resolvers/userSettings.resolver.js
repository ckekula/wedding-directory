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
exports.UserSettingsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const userSetting_model_1 = require("../models/userSetting.model");
const createUserSettings_1 = require("../inputs/createUserSettings");
const userSetting_service_1 = require("../../modules/user/userSetting.service");
let UserSettingsResolver = class UserSettingsResolver {
    constructor(userSettingsService) {
        this.userSettingsService = userSettingsService;
    }
    async createUserSettings(createUserSettingsData) {
        return this.userSettingsService.createUserSettings(createUserSettingsData);
    }
};
exports.UserSettingsResolver = UserSettingsResolver;
__decorate([
    (0, graphql_1.Mutation)(() => userSetting_model_1.UserSettingModel),
    __param(0, (0, graphql_1.Args)('createUserSettingsData')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUserSettings_1.CreateUserSettingsInput]),
    __metadata("design:returntype", Promise)
], UserSettingsResolver.prototype, "createUserSettings", null);
exports.UserSettingsResolver = UserSettingsResolver = __decorate([
    (0, graphql_1.Resolver)(() => userSetting_model_1.UserSettingModel),
    __metadata("design:paramtypes", [userSetting_service_1.UserSettingService])
], UserSettingsResolver);
//# sourceMappingURL=userSettings.resolver.js.map