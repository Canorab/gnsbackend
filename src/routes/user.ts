import { addUser, getAllUsers, getUser } from "@/controllers/user";

import { Router } from "express";
import { userRegSchema } from "@/config/schema";
import { validate } from "./../middlewares/zod.middleware";

const userRouter = Router();

userRouter.route("/").get(getAllUsers).post(validate(userRegSchema), addUser);
userRouter.route("/:id").get(getUser);

//   .get("/users", getAllUsers)
//   .post("/users", validate(userRegSchema), addUser);

export default userRouter;
// module.exports = userRouter;
