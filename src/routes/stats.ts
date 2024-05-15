import { getStatsForAdmin, getStatsForUser } from "@/controllers/stats";

import { Router } from "express";

const statsRouter = Router();

statsRouter.route("/admin").get(getStatsForAdmin); // All admin stats
statsRouter.route("/:username").get(getStatsForUser); // All admin stats

export default statsRouter;
