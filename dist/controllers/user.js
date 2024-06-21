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
exports.getTodayUserReferralDomainsCount = exports.getUserReferralDomainsCount = exports.getTodayUserReferralsCount = exports.getUserReferralsCount = exports.getTodayUsersCount = exports.getAllUsersWithStats = exports.getAllUsersCount = exports.deleteUser = exports.updateUser = exports.addUser = exports.getUserReferralDomains = exports.getUserReferrals = exports.getUser = exports.getAllUsers = void 0;
const domain_1 = __importDefault(require("../models/domain"));
const user_1 = __importDefault(require("../models/user"));
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.find().select("-password").lean().exec();
    if (!(users === null || users === void 0 ? void 0 : users.length))
        return res.status(400).json({ message: "No users found !" });
    const usersWithCount = yield Promise.all(users.map((user) => __awaiter(void 0, void 0, void 0, function* () {
        const domainCount = yield domain_1.default.aggregate([
            {
                $match: { username: user.username },
            },
        ]).count("total");
        return Object.assign({ id: user._id, domainsCount: domainCount.length ? domainCount[0].total : 0 }, user);
    })));
    res.json(usersWithCount);
});
exports.getAllUsers = getAllUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_1.default.findById(id).select("-password").lean().exec();
    if (!user)
        return res.status(409).json({ message: "User not found" });
    const domainCount = yield domain_1.default.aggregate([
        {
            $match: {
                username: `${user.username}`,
            },
        },
    ]).count("total");
    const userObj = Object.assign(Object.assign({}, user), { domainCount: domainCount.length ? domainCount[0].total : 0 });
    res.json(userObj);
});
exports.getUser = getUser;
const getUserReferrals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    const users = yield user_1.default.find({ referrerUsername: username })
        .select("-password")
        .lean()
        .exec();
    if (!(users === null || users === void 0 ? void 0 : users.length))
        return res.status(404).json({ message: "No referrals found." });
    const usersWithCount = yield Promise.all(users.map((user) => __awaiter(void 0, void 0, void 0, function* () {
        const domainCount = yield domain_1.default.aggregate([
            {
                $match: { username: user.username },
            },
        ]).count("total");
        return Object.assign({ id: user._id, domainsCount: domainCount.length ? domainCount[0].total : 0 }, user);
    })));
    res.json(usersWithCount);
});
exports.getUserReferrals = getUserReferrals;
const getUserReferralDomains = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    const users = yield user_1.default.find({ referrerUsername: username })
        .select("-password")
        .lean()
        .exec();
    if (!(users === null || users === void 0 ? void 0 : users.length))
        return res
            .status(404)
            .json({ message: "User must have at least 1 referral to proceed." });
    const userReferralDomains = yield user_1.default.aggregate([
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
            $unset: "password",
        },
        {
            $unwind: "$user_domains",
        },
        {
            $match: {
                user_domains: {
                    $exists: true,
                    $not: { $type: "array" },
                    $type: "object",
                },
            },
        },
        {
            $replaceRoot: {
                newRoot: "$user_domains",
            },
        },
    ]);
    res.json(userReferralDomains);
});
exports.getUserReferralDomains = getUserReferralDomains;
const addUser = (req, res, callback) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, firstName, lastName, password, email, wallet, referrerId, referrerUsername, roles, active, terms, } = req.body;
        const duplicate = yield user_1.default.findOne({ username })
            .collation({ locale: "en", strength: 2 })
            .lean()
            .exec();
        if (duplicate)
            return res
                .status(409)
                .json({ message: "Username taken, try another one !" });
        const referrer = yield user_1.default.findOne({ username: referrerUsername })
            .lean()
            .exec();
        if (!referrer)
            return res.status(401).json({ message: "Invalid affiliate username." });
        const user = yield user_1.default.create({
            firstName,
            lastName,
            username,
            password,
            email,
            wallet,
            referrerId,
            referrerUsername,
            roles,
            active,
            terms,
        });
        res.json({ message: "User created successfully !" });
    }
    catch (error) {
        console.log(error);
    }
});
exports.addUser = addUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { username, password, active, } = req.body;
    const user = yield user_1.default.findById(id).exec();
    if (!user)
        return res.status(400).json({ message: "User not found !" });
    if (!(user === null || user === void 0 ? void 0 : user.active))
        return res.status(401).json({ message: "Banned User. Contact Admin!" });
    const duplicate = yield user_1.default.findOne({ username })
        .collation({ locale: "en", strength: 2 })
        .lean()
        .exec();
    if (duplicate && (duplicate === null || duplicate === void 0 ? void 0 : duplicate._id.toString()) !== id)
        return res.status(409).json({ message: "Duplicate User Found !" });
    if (active)
        user.active = active;
    if (password)
        user.password = password;
    const updatedUser = yield user.save();
    res.json({
        message: `Updated User ${updatedUser.username} !`,
        body: updatedUser,
    });
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_1.default.findById(id).exec();
    if (!user)
        return res.status(400).json({ message: "User not found !" });
    const result = yield user.deleteOne();
    const reply = `User ${user.username} with ID ${user.id} is deleted !`;
    res.json({ mesage: reply, body: result });
});
exports.deleteUser = deleteUser;
const getAllUsersCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsersCount = yield user_1.default.aggregate().count("count");
    res.json(...allUsersCount);
});
exports.getAllUsersCount = getAllUsersCount;
const getAllUsersWithStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield user_1.default.find().select("-password").lean().exec();
    const usersWithStats = yield Promise.all(allUsers.map((user) => __awaiter(void 0, void 0, void 0, function* () {
        const referrals = yield user_1.default.aggregate([
            {
                $match: {
                    referrerUsername: `${user.username}`,
                },
            },
            {
                $unset: "password",
            },
        ]);
        const todayReferrals = yield user_1.default.aggregate([
            {
                $match: {
                    referrerUsername: `${user.username}`,
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
                $unset: "password",
            },
        ]);
        const referralsDomains = yield user_1.default.aggregate([
            { $match: { referrerUsername: `${user.username}` } },
            {
                $lookup: {
                    from: "domains",
                    localField: "username",
                    foreignField: "username",
                    as: "user_domains",
                },
            },
            {
                $unset: "password",
            },
            {
                $unwind: "$user_domains",
            },
            {
                $match: {
                    user_domains: {
                        $exists: true,
                        $not: { $type: "array" },
                        $type: "object",
                    },
                },
            },
            {
                $replaceRoot: {
                    newRoot: "$user_domains",
                },
            },
        ]);
        const todayReferralsDomains = yield user_1.default.aggregate([
            { $match: { referrerUsername: `${user.username}` } },
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
                $unset: "password",
            },
            {
                $unwind: "$user_domains",
            },
            {
                $match: {
                    user_domains: {
                        $exists: true,
                        $not: { $type: "array" },
                        $type: "object",
                    },
                },
            },
            {
                $replaceRoot: {
                    newRoot: "$user_domains",
                },
            },
        ]);
        return Object.assign(Object.assign({}, user), { referrals,
            referralsDomains,
            todayReferrals,
            todayReferralsDomains });
    })));
    res.json(usersWithStats);
});
exports.getAllUsersWithStats = getAllUsersWithStats;
const getTodayUsersCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todaySignups = yield user_1.default.aggregate([
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
    ]).count("total");
    res.json(todaySignups);
});
exports.getTodayUsersCount = getTodayUsersCount;
const getUserReferralsCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    const userReferrals = yield user_1.default.aggregate([
        {
            $match: {
                referrerUsername: `${username}`,
            },
        },
    ]).count("total");
    res.json(userReferrals);
});
exports.getUserReferralsCount = getUserReferralsCount;
const getTodayUserReferralsCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    const userReferrals = yield user_1.default.aggregate([
        {
            $match: {
                referrerUsername: `${username}`,
                createdAt: new Date("2024-04-21T22:06:24.117Z"),
            },
        },
    ]).count("total");
    res.json(userReferrals);
});
exports.getTodayUserReferralsCount = getTodayUserReferralsCount;
const getUserReferralDomainsCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    const userReferralDomains = yield user_1.default.aggregate([
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
    ]).count("total");
    res.json(userReferralDomains);
});
exports.getUserReferralDomainsCount = getUserReferralDomainsCount;
const getTodayUserReferralDomainsCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    const userReferralDomains = yield user_1.default.aggregate([
        {
            $match: {
                referrerUsername: `${username}`,
            },
        },
        {
            $lookup: {
                from: "domains",
                pipeline: [
                    { $match: { createdAt: new Date("2024-04-21T22:06:24.926Z") } },
                ],
                localField: "username",
                foreignField: "username",
                as: "referrals_domains",
            },
        },
        {
            $unwind: "$referrals_domains",
        },
    ]).count("total");
    res.json(userReferralDomains);
});
exports.getTodayUserReferralDomainsCount = getTodayUserReferralDomainsCount;
