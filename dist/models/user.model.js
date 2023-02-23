"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    email: { type: String },
    password: { type: String },
    idProvider: { type: String },
    provider: { type: String },
    recoveryToken: { type: String }
}, {
    versionKey: false,
    timestamps: true
});
const UserModel = (0, mongoose_1.model)('users', UserSchema);
exports.default = UserModel;
