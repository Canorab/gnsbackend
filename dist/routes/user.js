"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../controllers/user");
const schema_zod_1 = require("../config/schema.zod");
const express_1 = require("express");
const stats_1 = require("../controllers/stats");
const updateAllUsersDomains_1 = require("../middlewares/updateAllUsersDomains");
const updateUserDomains_1 = require("../middlewares/updateUserDomains");
const zod_middleware_1 = require("./../middlewares/zod.middleware");
const verifyJWT_1 = __importDefault(require("../middlewares/verifyJWT"));
const userRouter = (0, express_1.Router)();
userRouter.use(verifyJWT_1.default);
userRouter
    .route("/")
    .get(updateAllUsersDomains_1.updateAllUsersDomains, user_1.getAllUsers)
    .post((0, zod_middleware_1.validate)(schema_zod_1.userRegSchema), user_1.addUser);
userRouter.route("/affiliates").get(user_1.getAllUsersWithStats);
userRouter
    .route("/:id")
    .get((0, zod_middleware_1.validate)(schema_zod_1.getUserSchema), updateUserDomains_1.updateUserDomains, user_1.getUser)
    .patch((0, zod_middleware_1.validate)(schema_zod_1.userUpdateSchema), user_1.updateUser)
    .delete(user_1.deleteUser);
userRouter.route("/referrals/:username").get(user_1.getUserReferrals);
userRouter.route("/referrals/domains/:username").get(user_1.getUserReferralDomains);
userRouter.route("/stats/referrals/:username").get(user_1.getUserReferralsCount);
userRouter
    .route("/stats/referrals/today/:username")
    .get(user_1.getTodayUserReferralsCount);
userRouter
    .route("/stats/referrals/domains/:username")
    .get(user_1.getUserReferralDomainsCount);
userRouter
    .route("/stats/referrals/domains/today/:username")
    .get(user_1.getTodayUserReferralDomainsCount);
userRouter.route("/stats/all").get(stats_1.getStatsForAdmin);
userRouter.route("/stats/allusers").get(user_1.getAllUsersCount);
userRouter.route("/stats/today").get(user_1.getTodayUsersCount);
exports.default = userRouter;
