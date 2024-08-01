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
exports.UserModel = void 0;
const graphql_1 = require("@nestjs/graphql");
const userSetting_model_1 = require("./userSetting.model");
let UserModel = class UserModel {
};
exports.UserModel = UserModel;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], UserModel.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserModel.prototype, "username", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UserModel.prototype, "displayName", void 0);
__decorate([
    (0, graphql_1.Field)(() => userSetting_model_1.UserSettingModel, { nullable: true }),
    __metadata("design:type", userSetting_model_1.UserSettingModel)
], UserModel.prototype, "settings", void 0);
exports.UserModel = UserModel = __decorate([
    (0, graphql_1.ObjectType)()
], UserModel);
//# sourceMappingURL=user.model.js.map