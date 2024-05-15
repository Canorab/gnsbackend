"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("../env"));
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default
    .connect(env_1.default.DATABASE_URI)
    .then(() => {
    console.log("Connected to MongoDB !");
})
    .catch((err) => {
    console.log("Could not connect:", err.message);
});
