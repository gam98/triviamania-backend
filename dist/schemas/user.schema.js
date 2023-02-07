"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordInSessionUserSchema = exports.changePasswordUserSchema = exports.recoveryUserSchema = exports.getUserSchema = exports.updateUserSchema = exports.loginUserSchema = exports.createUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.string();
const email = joi_1.default.string().email();
const password = joi_1.default.string()
    .min(8)
    .max(16)
    .pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)
    .message('"password" must be a string with minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character');
const token = joi_1.default.string();
const oldPassword = joi_1.default.string()
    .min(8)
    .max(16)
    .pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)
    .message('"password" must be a string with minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character');
const newPassword = joi_1.default.string()
    .min(8)
    .max(16)
    .pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)
    .message('"password" must be a string with minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character');
const createUserSchema = joi_1.default.object({
    email: email.required(),
    password: password.required()
});
exports.createUserSchema = createUserSchema;
const loginUserSchema = joi_1.default.object({
    email: email.required(),
    password: password.required()
});
exports.loginUserSchema = loginUserSchema;
const updateUserSchema = joi_1.default.object({
    email
});
exports.updateUserSchema = updateUserSchema;
const getUserSchema = joi_1.default.object({
    id: id.required()
});
exports.getUserSchema = getUserSchema;
const recoveryUserSchema = joi_1.default.object({
    email: email.required()
});
exports.recoveryUserSchema = recoveryUserSchema;
const changePasswordUserSchema = joi_1.default.object({
    token: token.required(),
    newPassword: newPassword.required()
});
exports.changePasswordUserSchema = changePasswordUserSchema;
const changePasswordInSessionUserSchema = joi_1.default.object({
    oldPassword: oldPassword.required(),
    newPassword: newPassword.required()
});
exports.changePasswordInSessionUserSchema = changePasswordInSessionUserSchema;
