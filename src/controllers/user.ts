import { NextFunction, Request, RequestHandler, Response } from "express";

import UserModel from "@/models/user";
import { userRegSchema } from "@/config/schema";
import { z } from "zod";

export const getAllUsers: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users = await UserModel.find().select("-password").lean();
  if (!users?.length) return res.status(400).json({ message: "No user found !" });
  res.json(users);
};

export const getUser: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await UserModel.findById(id).exec();
  if (!user) return res.status(409).json({ message: "User not found" });

  res.json(user);
};

export const addUser: RequestHandler = async (req: Request, res: Response) => {
  //   userSchema.parse(req.body);

  const {
    firstName,
    lastName,
    username,
    password,
    email,
    terms,
    //   domains,
    wallet,
    //   referrerId,
    //   referrerUsername,
  } = req.body;

  const duplicate = await UserModel.findOne({ username })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();
  if (duplicate) return res.status(409).json({ message: "Username taken, try another one !" });

  const user = await UserModel.create({
    firstName,
    lastName,
    username,
    password,
    email,
    wallet,
    terms,
  });

  res.json({ message: "User created successfully !", body: user });
};

// module.exports = { getAllUsers, addUser };
