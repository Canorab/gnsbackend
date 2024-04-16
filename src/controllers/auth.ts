import { Request, RequestHandler, Response } from "express";

import { LoginType } from "@/config/schema.zod";
import UserModel from "@/models/user";
import env from "@/env";
import jwt from "jsonwebtoken";

/**
 * @description This function processes login requests
 * @route POST /auth
 * @param req
 * @param res
 * @returns
 */

export const login: RequestHandler = async (req: Request, res: Response) => {
  const { username, password }: LoginType["body"] = req.body;

  const foundUser = await UserModel.findOne({ username }).exec();
  if (!foundUser) {
    return res.status(404).json({ message: "User does not exist!" });
  }

  if (!foundUser?.active) {
    return res.status(401).json({ message: "Unauthorized !" });
  }

  const isMatched = await foundUser.comparePassword(password);
  if (!isMatched) {
    return res.status(403).json({ message: "Email/Password doesn't match" });
  }

  // At this point the username and password has been confirmed to be valid
  const accessToken = jwt.sign(
    {
      userInfo: {
        username: foundUser.username,
        roles: foundUser.roles,
        wallet: foundUser.wallet,
      },
    },
    env.ACCESS_TOKEN_SECRET,
    { expiresIn: "60s" }
  );

  const refreshToken = jwt.sign(
    { username: foundUser.username },
    env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );

  // Create secure cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true, //accessible only by web server
    secure: true, //https
    sameSite: "none", //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
  });

  // Send accessToken containing username and roles to the frontend
  res.json({ accessToken });
};

/**
 * @description This function sends refresh token to  the frontend on request.
 * @route GET /auth/refresh
 * @param req
 * @param res
 * @returns
 */

export const refresh: RequestHandler = (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });

    const foundUser = await UserModel.findOne({
      username: decoded?.username,
    }).exec();

    if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: foundUser.roles,
          wallet: foundUser.wallet,
        },
      },
      env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60s" }
    );

    res.json({ accessToken });
  });
};

/**
 * @description This function logs the user out by clearing the jwt cookie
 * @route POST /auth/logout
 * @param req
 * @param res
 * @returns
 */

export const logout: RequestHandler = (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  res.json({ message: "Cookie cleared" });
};

// module.exports = {
//   login,
//   refresh,
//   logout,
// };
