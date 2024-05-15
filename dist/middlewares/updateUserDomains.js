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
exports.updateUserDomains = void 0;
const domain_1 = __importDefault(require("../models/domain"));
const user_1 = __importDefault(require("../models/user"));
const domainHelpers_1 = require("../helpers/domainHelpers");
const web3Helpers_1 = require("../helpers/web3Helpers");
const updateUserDomains = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { wallet, username } = req.body;
    const user = yield user_1.default.findOne({ username }).select("-password").exec();
    if (!user)
        return res.status(409).json({ message: "User not found" });
    if (!user.active)
        return res.status(409).json({ message: "Banned User! Contact Admin." });
    const ownedDomains = yield domain_1.default.find({ username }).exec();
    const userNfts = yield (0, web3Helpers_1.openseaGetUserNfts)(wallet);
    const newDomains = (0, domainHelpers_1.getNewDomains)(userNfts, ownedDomains);
    if (newDomains === null || newDomains === void 0 ? void 0 : newDomains.length) {
        newDomains.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            const newDomainDoc = {
                userId: user._id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                name: item.name,
                image_url: item.image_url,
                identfier: item.identifier,
                wallet: user.wallet,
                data: {
                    name: item.name,
                    description: item.description,
                    image_url: item.image_url,
                    identifier: item.identifier,
                },
            };
            const result = yield domain_1.default.create(newDomainDoc);
            console.log("New domain added:", result);
        }));
    }
    next();
});
exports.updateUserDomains = updateUserDomains;
