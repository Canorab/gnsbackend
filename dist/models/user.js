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
const mongoose_1 = require("mongoose");
const bcrypt_1 = require("bcrypt");
const domain_1 = __importDefault(require("./domain"));
const domainHelpers_1 = require("../helpers/domainHelpers");
const web3Helpers_1 = require("../helpers/web3Helpers");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    wallet: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    referrerId: {
        type: String,
        trim: true,
    },
    referrerUsername: {
        type: String,
        trim: true,
    },
    roles: {
        type: [String],
        required: true,
        default: ["user"],
    },
    active: {
        type: Boolean,
        default: true,
        required: true,
    },
    terms: {
        type: Boolean,
        default: false,
        required: true,
    },
}, {
    timestamps: true,
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password"))
            return next();
        const salt = yield (0, bcrypt_1.genSalt)(10);
        this.password = yield (0, bcrypt_1.hash)(this.password, salt);
    });
});
userSchema.post("save", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userDomains = yield domain_1.default.find({ username: doc.username }).exec();
        const userNfts = yield (0, web3Helpers_1.openseaGetUserNfts)(doc.wallet);
        const newDomains = (0, domainHelpers_1.getNewDomains)(userNfts, userDomains);
        if (newDomains === null || newDomains === void 0 ? void 0 : newDomains.length) {
            newDomains.map((item) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const newDomainDoc = {
                        userId: doc._id,
                        username: doc.username,
                        firstName: doc.firstName,
                        lastName: doc.lastName,
                        name: item.name,
                        image_url: item.image_url,
                        identfier: item.identifier,
                        wallet: doc.wallet,
                        data: {
                            name: item.name,
                            description: item.description,
                            image_url: item.image_url,
                            identifier: item.identifier,
                        },
                    };
                    const response = yield domain_1.default.create(newDomainDoc);
                    console.log(`New Domain Created:`, response);
                }
                catch (error) {
                    console.log(error);
                }
            }));
        }
        next();
    });
});
userSchema.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, bcrypt_1.compare)(password, this.password);
    });
};
const UserModel = (0, mongoose_1.model)("User", userSchema);
exports.default = UserModel;
