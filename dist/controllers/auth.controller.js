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
exports.provider = exports.changePassword = exports.recoveryPassword = exports.login = exports.register = void 0;
const user_service_1 = require("../services/user.service");
const bcrypt_handler_1 = require("../utils/bcrypt.handler");
const jwt_handler_1 = require("../utils/jwt.handler");
const boom_1 = __importDefault(require("@hapi/boom"));
const config_1 = require("../config");
const email_handler_1 = require("../utils/email.handler");
const async_handler_1 = require("../middlewares/async.handler");
const convertDaysToMiliseconds_handler_1 = require("../utils/convertDaysToMiliseconds.handler");
const uuid_1 = require("uuid");
const register = (0, async_handler_1.asyncHandler)(({ body }, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = body;
    const user = yield (0, user_service_1.findOneUserByEmail)(email);
    if (user)
        throw boom_1.default.forbidden('Already registered');
    const passwordHash = yield (0, bcrypt_handler_1.encrypt)(password);
    const response = yield (0, user_service_1.registerNewUser)({ email, passwordHash });
    res.status(201).send({
        statusCode: res.statusCode,
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
        throw boom_1.default.unauthorized();
    const token = (0, jwt_handler_1.generateToken)({ id: user._id });
    res.status(200).cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'none',
        maxAge: (0, convertDaysToMiliseconds_handler_1.convertDaysInMiliseconds)(7)
    }).json({
        statusCode: res.statusCode,
        error: false,
        message: 'Login successful',
        response: {
            user: {
                id: user._id,
                email: user.email
            }
        }
    });
}));
exports.login = login;
const recoveryPassword = (0, async_handler_1.asyncHandler)(({ body }, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
exports.recoveryPassword = recoveryPassword;
const changePassword = (0, async_handler_1.asyncHandler)(({ body }, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
exports.changePassword = changePassword;
const provider = (0, async_handler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const profile = req.user.profile;
    if (profile === null)
        throw boom_1.default.badGateway();
    const userFound = yield (0, user_service_1.findOneUserByProvider)({ provider: profile.provider, idProvider: profile.id });
    if (userFound) {
        const token = (0, jwt_handler_1.generateToken)({ id: userFound._id });
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: (0, convertDaysToMiliseconds_handler_1.convertDaysInMiliseconds)(7)
        }).redirect('http://localhost:5173');
    }
    if (profile._json.email === undefined)
        throw boom_1.default.badRequest();
    const user = {
        email: profile._json.email,
        password: (0, uuid_1.v4)(),
        idProvider: profile.id,
        provider: profile.provider,
        recoveryToken: null
    };
    const userCreated = yield (0, user_service_1.socialLogin)(user);
    const token = (0, jwt_handler_1.generateToken)({ id: userCreated._id });
    res.status(200).cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: (0, convertDaysToMiliseconds_handler_1.convertDaysInMiliseconds)(7)
    }).redirect('http://localhost:5173');
}));
exports.provider = provider;
