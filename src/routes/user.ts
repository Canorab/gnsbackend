import {
  addUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "@/controllers/user";
import {
  getUserSchema,
  userDeleteSchema,
  userRegSchema,
  userUpdateSchema,
} from "@/config/schema.zod";

import { Router } from "express";
import { validate } from "./../middlewares/zod.middleware";

const userRouter = Router();

userRouter
  .route("/")
  .get(getAllUsers)
  .post(validate(userRegSchema), addUser)
  .patch(validate(userUpdateSchema), updateUser) // validate(userUpdateSchema),
  .delete(validate(userDeleteSchema), deleteUser);
userRouter.route("/:id").get(validate(getUserSchema), getUser);

//   .get("/users", getAllUsers)
//   .post("/users", validate(userRegSchema), addUser);

export default userRouter;
// module.exports = userRouter;
