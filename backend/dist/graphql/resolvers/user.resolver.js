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
exports.UserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_model_1 = require("../models/user.model");
const createUser_1 = require("../inputs/createUser");
const user_service_1 = require("../../modules/user/user.service");
const userSetting_service_1 = require("../../modules/user/userSetting.service");
const userSetting_model_1 = require("../models/userSetting.model");
let UserResolver = class UserResolver {
    constructor(userService, userSettingService) {
        this.userService = userService;
        this.userSettingService = userSettingService;
    }
    getUserById(id) {
        return this.userService.getUserById(id);
    }
    getAllUsers() {
        return this.userService.getAllUsers();
    }
    getUserSettings(user) {
        return this.userSettingService.getUserSettingById(user.id);
    }
    createUser(createUserData) {
        return this.userService.createUser(createUserData);
    }
};
exports.UserResolver = UserResolver;
__decorate([
    (0, graphql_1.Query)(() => user_model_1.UserModel, { nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUserById", null);
__decorate([
    (0, graphql_1.Query)(() => [user_model_1.UserModel]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "getAllUsers", null);
__decorate([
    (0, graphql_1.ResolveField)(() => userSetting_model_1.UserSettingModel, { name: 'settings', nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.UserModel]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "getUserSettings", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_model_1.UserModel),
    __param(0, (0, graphql_1.Args)('createUserData')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUser_1.CreateUserInput]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "createUser", null);
exports.UserResolver = UserResolver = __decorate([
    (0, graphql_1.Resolver)(() => user_model_1.UserModel),
    __metadata("design:paramtypes", [user_service_1.UserService,
        userSetting_service_1.UserSettingService])
], UserResolver);
//# sourceMappingURL=user.resolver.js.map