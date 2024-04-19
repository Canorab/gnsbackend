import {
  GetUserType,
  UserDeleteType,
  UserType,
  UserUpdateType,
} from "@/config/schema.zod";
import { NextFunction, Request, RequestHandler, Response } from "express";

import UserModel from "@/models/user";

export const getAllUsers: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users = await UserModel.find().select("-password").lean();
  if (!users?.length)
    return res.status(400).json({ message: "No user found !" });
  res.json(users);
};

export const getUser: RequestHandler = async (req: Request, res: Response) => {
  // const { id }: GetUserType["params"] = req.params;
  const { id } = req.params;

  const user = await UserModel.findById(id).exec();
  if (!user) return res.status(409).json({ message: "User not found" });

  res.json(user);
};

export const addUser: RequestHandler = async (req: Request, res: Response) => {
  //   userSchema.parse(req.body);

  const {
    username,
    firstName,
    lastName,
    password,
    email,
    domainsCount,
    wallet,
    referrerUsername,
    terms,
  }: UserType["body"] = req.body;

  // const {
  //   username,
  //   firstName,
  //   lastName,
  //   password,
  //   email,
  //   domains,
  //   wallet,
  //   referrerUsername,
  //   terms,
  // }: UserType = {
  //   firstName: req.body.firstName,
  //   lastName: req.body.lastName,
  //   username: req.body.username,
  //   password: req.body.password,
  //   email: req.body.email,
  //   terms: req.body.terms,
  //   domains: req.body.domains,
  //   wallet: req.body.wallet,
  //   //   referrerId,
  //   referrerUsername: req.body.referrerUsername,
  // };

  const duplicate = await UserModel.findOne({ username })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();
  if (duplicate)
    return res
      .status(409)
      .json({ message: "Username taken, try another one !" });

  const user = await UserModel.create({
    firstName,
    lastName,
    username,
    password,
    email,
    domainsCount,
    wallet,
    referrerUsername,
    terms,
  });

  res.json({ message: "User created successfully !", body: user });
};

export const updateUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  //1. Retrieve id, Username (user's Mongodb Doc ID) from  the request body, terminate if it doesn't exist
  // const { id, username, domains, password, active }: UserUpdateType = req.body;
  const {
    id,
    username,
    domainsCount,
    password,
    active,
  }: UserUpdateType["body"] = req.body;

  //2. Fetch a user from Mongodb using the provided Id, terminate if no record was found
  const user = await UserModel.findById(id).exec();

  if (!user) return res.status(400).json({ message: "User not found !" });

  //3. Check for duplicate user by using the username provided above to fetch a new user
  // Then check if the newly found user's doc Id is equal to the first found user's doc Id
  // If both users doesn't have a matching doc Id, it means a single person have 2 accounts
  // Therefore, terminate with an error.
  const duplicate = await UserModel.findOne({ username })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate && duplicate?._id.toString() !== id)
    return res.status(409).json({ message: "Duplicate User Found !" });

  //4. Implement a switch statement to check the value of res.body and then assigning
  // values from the provided data in res.body to the various fields of the first found user
  // or generated data in the case of password.

  if (domainsCount) user.domainsCount = domainsCount; //parseInt(domains);
  if (active) user.active = active;
  if (password) user.password = password;

  //5. Save the  changes to the firstly found mongodb user
  const updatedUser = await user.save();
  console.log(updatedUser);
  res.json({
    message: `Updated User ${updatedUser.username} !`,
    body: updatedUser,
  });
};

export const deleteUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id }: UserDeleteType["body"] = req.body;
  const user = await UserModel.findById(id).exec();

  if (!user) return res.status(400).json({ message: "User not found !" });

  const result = await user.deleteOne();

  const reply = `User ${user.username} with ID ${user.id} is deleted !`;
  res.json({ mesage: reply, body: result });
};

// module.exports = { getAllUsers, addUser };
