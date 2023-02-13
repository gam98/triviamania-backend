"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const result_routes_1 = __importDefault(require("./result.routes"));
const routerApi = (app) => {
    const router = (0, express_1.Router)();
    app.use('/api/v1', router);
    router.use('/auth', auth_routes_1.default);
    router.use('/users', user_routes_1.default);
    router.use('/results', result_routes_1.default);
};
exports.default = routerApi;
