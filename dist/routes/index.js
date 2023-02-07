"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
// import userRouter from './user.routes'
const routerApi = (app) => {
    const router = (0, express_1.Router)();
    app.use('/api/v1', router);
    router.use('/auth', auth_routes_1.default);
    // router.use('/users', userRouter)
};
exports.default = routerApi;
