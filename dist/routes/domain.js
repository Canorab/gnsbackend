"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../controllers/domain");
const express_1 = require("express");
const verifyJWT_1 = __importDefault(require("../middlewares/verifyJWT"));
const domainRouter = (0, express_1.Router)();
// domainRouter.use(verifyJWT_1.default);
domainRouter.route("/").get(domain_1.getAllUsersDomains);
domainRouter.route("/:username").get(domain_1.getUserDomains);
domainRouter.route("/stats/all").get(domain_1.getAllDomainsCount);
domainRouter.route("/stats/today").get(domain_1.getTodayDomainsCount);
domainRouter.route("/stats/:username").get(domain_1.getUserDomainsCount);
exports.default = domainRouter;
