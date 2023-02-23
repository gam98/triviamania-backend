"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const auth_controller_1 = require("../controllers/auth.controller");
const validator_handler_1 = __importDefault(require("../middlewares/validator.handler"));
const user_schema_1 = require("../schemas/user.schema");
const router = (0, express_1.Router)();
router.post('/register', (0, validator_handler_1.default)(user_schema_1.createUserSchema, 'body'), auth_controller_1.register);
router.post('/login', (0, validator_handler_1.default)(user_schema_1.loginUserSchema, 'body'), auth_controller_1.login);
router.post('/recovery', (0, validator_handler_1.default)(user_schema_1.recoveryUserSchema, 'body'), auth_controller_1.recoveryPassword);
router.post('/change-password', (0, validator_handler_1.default)(user_schema_1.changePasswordUserSchema, 'body'), auth_controller_1.changePassword);
router.get('/google', passport_1.default.authenticate('google', {
    scope: ['email', 'profile']
}));
router.get('/google/callback', passport_1.default.authenticate('google', { session: false }), auth_controller_1.provider);
exports.default = router;
