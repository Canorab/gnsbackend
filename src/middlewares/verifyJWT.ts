import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import env from "@/env";

type CustomRequest = Request & {
  userInfo: string | JwtPayload;
};

const verifyJWT: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //   const authHeader = req.headers.authorization || req.headers.Authorization;
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer "))
      return res.status(401).json({ message: "Unauthorized !" });

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("Invalid Auth Token");
    }
    const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET);
    if (decoded) {
      (req as CustomRequest).userInfo = decoded;
      //   console.log(decoded);
    }
    next();
  } catch (error) {
    // console.log(error);
    res.status(403).json({ message: "Failed to Authenticate." });
  }

  // jwt.verify(token, env.ACCESS_TOKEN_SECRET, (err, decodedUser) => {
  //   if (err) return res.status(403).json({ message: "Forbidden !" });
  //   req.username = decodedUser?.userInfo.username as jwt.JwtPayload;
  //   req.roles = decodedUser.userInfo.roles;
  //   req.wallet = decodedUser.userInfo.wallet;
  // })
};

export default verifyJWT;
