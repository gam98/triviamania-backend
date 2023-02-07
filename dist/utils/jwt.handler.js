"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
const generateToken = (payload, time = '2h') => {
    const jwt = (0, jsonwebtoken_1.sign)(payload, config_1.config.jwtSecret, {
        expiresIn: time
    });
    return jwt;
};
exports.generateToken = generateToken;
const verifyToken = (jwt) => {
    const isOk = (0, jsonwebtoken_1.verify)(jwt, config_1.config.jwtSecret);
    return isOk;
};
exports.verifyToken = verifyToken;
