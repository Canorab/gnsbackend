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
exports.getTodayDomainsCount = exports.getAllDomainsCount = exports.getUserDomainsCount = exports.getUserDomains = exports.getAllUsersDomains = void 0;
const domain_1 = __importDefault(require("../models/domain"));
const user_1 = __importDefault(require("../models/user"));
const getAllUsersDomains = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const domains = yield domain_1.default.find().exec();
    if (!domains)
        return res.status(400).json({ message: "No Domains Found!" });
    res.json(domains);
});
exports.getAllUsersDomains = getAllUsersDomains;
const getUserDomains = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    const user = yield user_1.default.findOne({ username }).lean().exec();
    if (!user)
        return res.status(400).json({ message: " User not found !" });
    if (user.active === false)
        return res.status(409).json({ message: "Banned User. Contact Admin !" });
    const domains = yield domain_1.default.find({ username }).exec();
    if (!domains)
        return res.status(400).json({ message: " User doesn't have any domains!" });
    res.json(domains);
});
exports.getUserDomains = getUserDomains;
const getUserDomainsCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    const user = yield user_1.default.findOne({ username })
        .select("-password")
        .lean()
        .exec();
    if (!user)
        return res.status(403).json({ message: "User not found !" });
    const domainsCount = yield domain_1.default.aggregate([
        {
            $match: {
                username: `${username}`,
            },
        },
    ]).count("total");
    res.json(domainsCount);
});
exports.getUserDomainsCount = getUserDomainsCount;
const getAllDomainsCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allDomainsCount = yield domain_1.default.aggregate().count("total");
    res.json(allDomainsCount);
});
exports.getAllDomainsCount = getAllDomainsCount;
const getTodayDomainsCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const domainsCount = yield domain_1.default.aggregate([
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
    res.json(domainsCount);
});
exports.getTodayDomainsCount = getTodayDomainsCount;
