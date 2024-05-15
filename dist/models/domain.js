"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const domainSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        trim: true,
        required: true,
    },
    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    },
    name: {
        type: String,
        trim: true,
        required: true,
    },
    image_url: {
        type: String,
        trim: true,
    },
    wallet: {
        type: String,
        trim: true,
        required: true,
    },
    data: {
        type: Object,
    },
}, {
    timestamps: true,
});
const DomainModel = (0, mongoose_1.model)("Domain", domainSchema);
exports.default = DomainModel;
