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

const domainRouter = Router();
domainRouter.use(verifyJWT);
// AddMany add all the nft  domains returned by web3js from the blockchan to mongodb in separate docs
domainRouter.route("/").get(getAllUsersDomains);
domainRouter.route("/:username").get(getUserDomains); // Update the user's ntf domains on Db with their new collections from the blockchain before send response
domainRouter.route("/stats/all").get(getAllDomainsCount);
domainRouter.route("/stats/today").get(getTodayDomainsCount);
domainRouter.route("/stats/:username").get(getUserDomainsCount);

// STATS FOR ADMIN
// domainsRouter.route("/stats/daily/all").get(getAllDomainsCount);
// domainsRouter.route("/stats/daily/today").get(getTodayDomainsCount);

// domainsRouter
//   .route("/addmany")
//   .post(fetchUserDomains, processDomains, addManyDomains); // insert these middlewares; fetchDomains, processDomains (optional)
export default domainRouter;
