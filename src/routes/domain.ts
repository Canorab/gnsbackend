import {
  addManyDomains,
  addNewDomain,
  getAllDomains,
  getUserDomains,
} from "@/controllers/domain";

import { Router } from "express";
import { fetchDomains } from "./../middlewares/fetchDomains";
import { processDomains } from "./../middlewares/processDomains";
import { validate } from "./../middlewares/zod.middleware";

const domainsRouter = Router();

domainsRouter.route("/").get(getAllDomains).post(addNewDomain);
domainsRouter.route("/:username").get(getUserDomains);
domainsRouter
  .route("/addmany")
  .post(fetchDomains, processDomains, addManyDomains); // insert these middlewares; fetchDomains, processDomains (optional)
export default domainsRouter;
