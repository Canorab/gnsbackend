import { login, logout, refresh } from "@/controllers/auth";

import { Router } from "express";
import { userLoginSchema } from "@/config/schema";
import { validate } from "@/middlewares/zod.middleware";

const authRouter = Router();

authRouter.route("/").post(validate(userLoginSchema), login);
authRouter.route("/refresh").post(refresh);
authRouter.route("/logout").post(logout);
