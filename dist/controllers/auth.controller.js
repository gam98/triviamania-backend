"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.recoveryPassword = exports.login = exports.register = void 0;
const user_service_1 = require("../services/user.service");
const bcrypt_handler_1 = require("../utils/bcrypt.handler");
const jwt_handler_1 = require("../utils/jwt.handler");
const boom_1 = __importDefault(require("@hapi/boom"));
const config_1 = require("../config");
const email_handler_1 = require("../utils/email.handler");
const async_handler_1 = require("../middlewares/async.handler");
const register = (0, async_handler_1.asyncHandler)(({ body }, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = body;
    const user = yield (0, user_service_1.findOneUserByEmail)(email);
    if (user)
        throw boom_1.default.forbidden('Already registered');
    const passwordHash = yield (0, bcrypt_handler_1.encrypt)(password);
    const response = yield (0, user_service_1.registerNewUser)({ email, passwordHash });
    res.status(201).send({
        statusCode: 201,
        error: false,
        message: 'Registration successful',
        response
    });
}));
exports.register = register;
const login = (0, async_handler_1.asyncHandler)(({ body }, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = body;
    const user = yield (0, user_service_1.findOneUserByEmail)(email);
    if (!user)
        throw boom_1.default.notFound('User not found');
    const isCorrect = yield (0, bcrypt_handler_1.verify)(password, user.password);
    if (!isCorrect)
        throw boom_1.default.unauthorized('Password incorrect');
    const token = (0, jwt_handler_1.generateToken)({ id: user._id });
    res.status(200).send({
        statusCode: 200,
        error: false,
        message: 'Login successful',
        response: {
            user: {
                id: user._id,
                email: user.email
            },
            token
        }
    });
}));
exports.login = login;
const recoveryPassword = ({ body }, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = body;
        const user = yield (0, user_service_1.findOneUserByEmail)(email);
        if (!user)
            throw boom_1.default.notFound('User not found');
        const payload = { sub: user._id };
        const token = (0, jwt_handler_1.generateToken)(payload, '15min');
        const link = `${config_1.config.frontendUrl}/recovery?token=${token}`;
        yield (0, user_service_1.updateOneUser)(user._id, { recoveryToken: token });
        const mail = {
            from: config_1.config.smtpEmail,
            to: `${user.email}`,
            subject: 'Email to recover password',
            html: `<b>Click <a href="${link}" target="_blank">here</a> to redirect the page</b>`
        };
        const response = yield (0, email_handler_1.sendEmail)(mail);
        res.status(200).send({
            statusCode: 200,
            message: response
        });
    }
    catch (error) {
        next(error);
    }
});
exports.recoveryPassword = recoveryPassword;
const changePassword = ({ body }, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, newPassword } = body;
        const payload = (0, jwt_handler_1.verifyToken)(token);
        const { sub } = payload;
        const user = yield (0, user_service_1.findOneUserById)(sub);
        if ((user === null || user === void 0 ? void 0 : user.recoveryToken) === null)
            throw boom_1.default.unauthorized();
        const passwordHash = yield (0, bcrypt_handler_1.encrypt)(newPassword);
        yield (0, user_service_1.updateOneUser)(sub, {
            recoveryToken: null,
            password: passwordHash
        });
        res.status(200).send({
            statusCode: res.statusCode,
            message: 'Password changed successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
exports.changePassword = changePassword;
