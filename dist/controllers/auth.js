"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.logout = exports.refresh = exports.login = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const env_1 = __importDefault(require("../env"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const foundUser = yield user_1.default.findOne({ username }).exec();
    if (!foundUser) {
        return res.status(404).json({ message: "User does not exist!" });
    }
    if (!(foundUser === null || foundUser === void 0 ? void 0 : foundUser.active)) {
        return res.status(401).json({ message: "Unauthorized !" });
    }
    const isMatched = yield foundUser.comparePassword(password);
    if (!isMatched) {
        return res.status(403).json({ message: "Email/Password doesn't match" });
    }
    const accessToken = jwt.sign({
        userInfo: {
            id: foundUser._id,
            username: foundUser.username,
            roles: foundUser.roles,
            wallet: foundUser.wallet,
            email: foundUser.email,
        },
    }, env_1.default.ACCESS_TOKEN_SECRET, { expiresIn: "1m" });
    const refreshToken = jwt.sign({ username: foundUser.username }, env_1.default.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });
    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
});
exports.login = login;
const refresh = (req, res) => {
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
        return res.status(401).json({ message: "Unauthorized" });
    const refreshToken = cookies.jwt;
    jwt.verify(refreshToken, env_1.default.REFRESH_TOKEN_SECRET, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            return res.status(403).json({ message: "Forbidden" });
        const foundUser = yield user_1.default.findOne({
            username: decoded === null || decoded === void 0 ? void 0 : decoded.username,
        }).exec();
        if (!foundUser)
            return res.status(401).json({ message: "Unauthorized" });
        const accessToken = jwt.sign({
            userInfo: {
                id: foundUser._id,
                username: foundUser.username,
                roles: foundUser.roles,
                wallet: foundUser.wallet,
                email: foundUser.email,
            },
        }, env_1.default.ACCESS_TOKEN_SECRET, { expiresIn: "1m" });
        res.json({ accessToken });
    }));
};
exports.refresh = refresh;
const logout = (req, res) => {
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
        return res.sendStatus(204);
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    res.json({ message: "Cookie cleared" });
};
exports.logout = logout;
