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
exports.getStatsForUser = exports.getStatsForAdmin = void 0;
const domain_1 = __importDefault(require("../models/domain"));
const user_1 = __importDefault(require("../models/user"));
const getStatsForAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsersCount = yield user_1.default.aggregate().count("totalUsers");
    const todayUsersCount = yield user_1.default.aggregate([
        {
            $match: {
                $expr: {
                    $lt: [
                        {
                            $dateDiff: {
                                startDate: "$_id",
                                endDate: "$$NOW",
                                unit: "hour",
                            },
                        },
                        24,
                    ],
                },
            },
        },
    ]).count("todayUsers");
    const allDomainsCount = yield domain_1.default.aggregate().count("totalDomains");
    const todayDomainsCount = yield domain_1.default.aggregate([
        {
            $match: {
                $expr: {
                    $lt: [
                        {
                            $dateDiff: {
                                startDate: "$_id",
                                endDate: "$$NOW",
                                unit: "hour",
                            },
                        },
                        24,
                    ],
                },
            },
        },
    ]).count("todayDomains");
    res.json([
        {
            totalusers: allUsersCount.length ? allUsersCount[0].totalUsers : 0,
            todayUsers: todayUsersCount.length ? todayUsersCount[0].todayUsers : 0,
            totalDomains: allDomainsCount.length
                ? allDomainsCount[0].totalDomains
                : 0,
            todayDomains: todayDomainsCount.length
                ? todayDomainsCount[0].todayDomains
                : 0,
        },
    ]);
});
exports.getStatsForAdmin = getStatsForAdmin;
const getStatsForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    const userReferralscount = yield user_1.default.aggregate([
        {
            $match: { referrerUsername: `${username}` },
        },
    ]).count("totalUsers");
    const todayUserReferralscount = yield user_1.default.aggregate([
        {
            $match: { referrerUsername: `${username}` },
        },
        {
            $match: {
                $expr: {
                    $lt: [
                        {
                            $dateDiff: {
                                startDate: "$_id",
                                endDate: "$$NOW",
                                unit: "hour",
                            },
                        },
                        24,
                    ],
                },
            },
        },
    ]).count("todayUsers");
    const userReferralsDomainsCount = yield user_1.default.aggregate([
        { $match: { referrerUsername: `${username}` } },
        {
            $lookup: {
                from: "domains",
                localField: "username",
                foreignField: "username",
                as: "user_domains",
            },
        },
        {
            $unwind: "$user_domains",
        },
    ]).count("totalDomains");
    const todayUserReferralsDomains = yield domain_1.default.aggregate([
        { $match: { referrerUsername: `${username}` } },
        {
            $lookup: {
                from: "domains",
                localField: "username",
                foreignField: "username",
                as: "user_domains",
            },
        },
        {
            $match: {
                $expr: {
                    $lt: [
                        {
                            $dateDiff: {
                                startDate: "$_id",
                                endDate: "$$NOW",
                                unit: "hour",
                            },
                        },
                        24,
                    ],
                },
            },
        },
        {
            $unwind: "$user_domains",
        },
    ]).count("todayDomains");
    res.json([
        {
            totalusers: userReferralscount.length
                ? userReferralscount[0].totalUsers
                : 0,
            todayUsers: todayUserReferralscount.length
                ? todayUserReferralscount[0].todayUsers
                : 0,
            totalDomains: userReferralsDomainsCount.length
                ? userReferralsDomainsCount[0].totalDomains
                : 0,
            todayDomains: todayUserReferralsDomains.length
                ? todayUserReferralsDomains[0].todayDomains
                : 0,
        },
    ]);
});
exports.getStatsForUser = getStatsForUser;
