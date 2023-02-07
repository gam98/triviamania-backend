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
exports.deleteOneUser = exports.updateOneUser = exports.findOneUserById = exports.findOneUserByEmail = exports.registerNewUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const registerNewUser = ({ email, passwordHash }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.create({
        password: passwordHash,
        email,
        recoveryToken: null
    });
    const userRegistered = {
        _id: user._id,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };
    return userRegistered;
});
exports.registerNewUser = registerNewUser;
const findOneUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const userFound = yield user_model_1.default.findOne({ email });
    return userFound;
});
exports.findOneUserByEmail = findOneUserByEmail;
const findOneUserById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(_id);
    return user;
});
exports.findOneUserById = findOneUserById;
const updateOneUser = (_id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findByIdAndUpdate(_id, data, { new: true }).select('-password -recoveryToken');
    if (user === null)
        return null;
    return user;
});
exports.updateOneUser = updateOneUser;
const deleteOneUser = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const userDeleted = yield user_model_1.default.findByIdAndDelete({ _id });
    return userDeleted;
});
exports.deleteOneUser = deleteOneUser;
