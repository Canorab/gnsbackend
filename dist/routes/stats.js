"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stats_1 = require("../controllers/stats");
const express_1 = require("express");
const statsRouter = (0, express_1.Router)();
statsRouter.route("/admin").get(stats_1.getStatsForAdmin);
statsRouter.route("/:username").get(stats_1.getStatsForUser);
exports.default = statsRouter;
