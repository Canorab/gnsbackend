import { login, logout, refresh } from "@/controllers/auth";
import { userLoginSchema, userRegSchema } from "@/config/schema.zod";

import { Router } from "express";
import { addUser } from "@/controllers/user";
import loginLimiter from "@/middlewares/loginLimiter";
import { validate } from "@/middlewares/zod.middleware";

const authRouter = Router();

authRouter.route("/").post(validate(userLoginSchema), login);
authRouter.route("/refresh").get(refresh);
authRouter.route("/signup").post(validate(userRegSchema), addUser);
authRouter.route("/logout").post(logout);

export default authRouter;
