import {
  addUser,
  deleteUser,
  getAllUsers,
  getAllUsersCount,
  getAllUsersWithStats,
  getTodayUserReferralDomainsCount,
  getTodayUserReferralsCount,
  getTodayUsersCount,
  getUser,
  getUserReferralDomainsCount,
  getUserReferrals,
  getUserReferralsCount,
  updateUser,
} from "@/controllers/user";
import {
  getUserSchema,
  userDeleteSchema,
  userRegSchema,
  userUpdateSchema,
} from "@/config/schema.zod";

import { Router } from "express";
import { getStatsForAdmin } from "@/controllers/stats";
import { updateAllUsersDomains } from "@/middlewares/updateAllUsersDomains";
import { updateUserDomains } from "@/middlewares/updateUserDomains";
import { validate } from "./../middlewares/zod.middleware";
import verifyJWT from "@/middlewares/verifyJWT";

const userRouter = Router();

userRouter.use(verifyJWT);

userRouter
  .route("/")
  .get(updateAllUsersDomains, getAllUsers)
  .post(validate(userRegSchema), addUser);
//   .delete(validate(userDeleteSchema), deleteUser);
// Fetches all users along with stats
userRouter.route("/affiliates").get(getAllUsersWithStats);
userRouter
  .route("/:id")
  .get(validate(getUserSchema), updateUserDomains, getUser)
  .patch(validate(userUpdateSchema), updateUser) // validate(userUpdateSchema),
  .delete(deleteUser);

userRouter.route("/referrals/:username").get(getUserReferrals);

// Basic Users stats - moved to Domains routes
// userRouter
//   .route("/stats/domains/:username")
//   // .get(getUserDomainsCount);

// Stats For Users
userRouter.route("/stats/referrals/:username").get(getUserReferralsCount); // Sends  all a user's domains
userRouter
  .route("/stats/referrals/today/:username")
  .get(getTodayUserReferralsCount); // Sends  all a user's domains
userRouter
  .route("/stats/referrals/domains/:username")
  .get(getUserReferralDomainsCount);
userRouter
  .route("/stats/referrals/domains/today/:username")
  .get(getTodayUserReferralDomainsCount);

// Stats For Admin
userRouter.route("/stats/all").get(getStatsForAdmin); // All admin stats
userRouter.route("/stats/allusers").get(getAllUsersCount); // All time signups
userRouter.route("/stats/today").get(getTodayUsersCount); // Signups for the day

// userRouter.route("/stats/alldomains").get(getAllUsersReferralsCount);
//   .get("/users", getAllUsers)
//   .post("/users", validate(userRegSchema), addUser);

export default userRouter;
// module.exports = userRouter;
