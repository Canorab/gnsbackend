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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../env"));
const verifyJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith("Bearer ")))
            return res.status(401).json({ message: "Unauthorized !" });
        const token = authHeader.split(" ")[1];
        if (!token) {
            throw new Error("Invalid Auth Token");
        }
        const decoded = jsonwebtoken_1.default.verify(token, env_1.default.ACCESS_TOKEN_SECRET);
        if (decoded) {
            req.userInfo = decoded;
        }
        next();
    }
    catch (error) {
        res.status(403).json({ message: "Failed to Authenticate." });
    }
});
exports.default = verifyJWT;
