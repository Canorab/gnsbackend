import {
  getAllDomainsCount,
  getAllUsersDomains,
  getTodayDomainsCount,
  getUserDomains,
  getUserDomainsCount,
} from "@/controllers/domain";

import { Router } from "express";
import { fetchUserDomains } from "../middlewares/fetchUserDomains";
import { processDomains } from "./../middlewares/processDomains";
import { validate } from "./../middlewares/zod.middleware";
import verifyJWT from "@/middlewares/verifyJWT";

const domainsRouter = Router();
domainsRouter.use(verifyJWT);
// AddMany add all the nft  domains returned by web3js from the blockchan to mongodb in separate docs
domainsRouter.route("/").get(getAllUsersDomains);
domainsRouter.route("/:username").get(getUserDomains); // Update the user's ntf domains on Db with their new collections from the blockchain before send response
domainsRouter.route("/stats/all").get(getAllDomainsCount);
domainsRouter.route("/stats/today").get(getTodayDomainsCount);
domainsRouter.route("/stats/:username").get(getUserDomainsCount);

// STATS FOR ADMIN
// domainsRouter.route("/stats/daily/all").get(getAllDomainsCount);
// domainsRouter.route("/stats/daily/today").get(getTodayDomainsCount);

// domainsRouter
//   .route("/addmany")
//   .post(fetchUserDomains, processDomains, addManyDomains); // insert these middlewares; fetchDomains, processDomains (optional)
export default domainsRouter;
