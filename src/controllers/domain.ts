import { NextFunction, Request, RequestHandler, Response } from "express";

import DomainModel from "@/models/domain";
import { GetUserDomainsType } from "@/config/schema.zod";
import UserModel from "@/models/user";

export const addNewDomain: RequestHandler = async (
  req: Request,
  res: Response
) => {
  res.json({ message: "Contact reached! Adding a New domain soon!" });
};

export const addManyDomains: RequestHandler = async (
  req: Request,
  res: Response
) => {
  // Expects a req.body.domains[]
  // maps through and creates a doc with each returned object in the domains collection using the DomainModel.
  //Before then, it should filter out existing domains (.e domain which has already been saved to the user's Record in MongoDb)
  const { greet } = res.locals;
  const { domains } = res.locals;
  const data = JSON.stringify(domains);
  res.json({
    message: `Received data from previous middlewares: Contact reached! Adding Many domains soon!`,
    body: domains,
  });
};

export const getAllDomains: RequestHandler = async (
  req: Request,
  res: Response
) => {
  res.json({ message: "Contact reached! Receiving All domains soon!" });
};

/**
 * @description This controller fetches a user's nfts from the mongodb database
 * @param req
 * @param res
 * @returns
 */
// export const getUserDomains: RequestHandler = async (
//   req: Request,
//   res: Response
// ) => {
//   const { userId, wallet }: GetUserDomainsType["body"] = req.body;
//   //Step 1: Check if the user is active using the provided id field, else terminate
//   const user = await UserModel.findById(userId).lean().exec();

//   if (!user) return res.status(400).json({ message: " User not found !" });

//   if (user.active === false)
//     return res.status(409).json({ message: "Banned User ! Contact Admin." });

//   // From this point on, you can fetch nfts from Mongodb
//   const domains = await DomainModel.find({ userId });
//   res.json({ body: domains });
// };

/**
 * @description This controller accepts a username param and fetches the user's nfts from the mongodb database
 * @param req
 * @param res
 * @returns
 */
export const getUserDomains: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { username } = req.params;
  //Step 1: Check if the user is active using the provided id field, else terminate
  //   const user = await UserModel.findById({ username }).lean().exec();
  const user = await UserModel.findOne({ username }).lean().exec();

  if (!user) return res.status(400).json({ message: " User not found !" });

  if (user.active === false)
    return res.status(409).json({ message: "Banned User. Contact Admin !" });

  // From this point on, you can fetch nfts from Mongodb
  const domains = await DomainModel.find({ username });
  if (!domains)
    return res.status(400).json({ message: " User doesn't have any domains!" });

  res.json({ body: domains });
};
