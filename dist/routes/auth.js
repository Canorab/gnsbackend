"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../controllers/auth");
const schema_zod_1 = require("../config/schema.zod");
const express_1 = require("express");
const user_1 = require("../controllers/user");
const loginLimiter_1 = __importDefault(require("../middlewares/loginLimiter"));
const zod_middleware_1 = require("../middlewares/zod.middleware");
const authRouter = (0, express_1.Router)();
authRouter.route("/").post((0, zod_middleware_1.validate)(schema_zod_1.userLoginSchema), loginLimiter_1.default, auth_1.login);
authRouter.route("/refresh").get(auth_1.refresh);
authRouter.route("/signup").post((0, zod_middleware_1.validate)(schema_zod_1.userRegSchema), user_1.addUser);
authRouter.route("/logout").post(auth_1.logout);
exports.default = authRouter;
