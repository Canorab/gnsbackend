import { NextFunction, Request, RequestHandler, Response } from "express";

import DomainModel from "@/models/domain";
import { GetUserDomainsType } from "@/config/schema.zod";
import UserModel from "@/models/user";
import axios from "axios";
import env from "@/env";

/* This controller should fetch all documents from the domains collection */
export const getAllUsersDomains: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const domains = await DomainModel.find().exec();
  if (!domains) return res.status(404).json({ message: "No Domains Found!" });

  res.json(domains);

  /**
   ** Proceed to fetch all docs from the domains collection. They should be up-to-date now
   * 8. Now proceed to fetch all domains from the mongodb domains collection using .find() - outside the map function
   * 9. Send the response to the frontend.
   */
  //   res.json({ message: "Contact reached! Receiving All domains soon!" });
};

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
  // This controller should not directly fetch the user's nfts from mongodb, instead it should receive the nft[] from the
  // fetchDomains middleware. Alternatively, implement a pre hook that'll fetch a user's domains from the blockchain using
  //their wallet and save to mongodb for the Domain model.

  const { username } = req.params;
  //Step 1: Check if the user is active using the provided id field, else terminate
  //   const user = await UserModel.findById({ username }).lean().exec();
  const user = await UserModel.findOne({ username }).lean().exec();

  if (!user) return res.status(404).json({ message: " User not found !" });

  if (user.active === false)
    return res.status(403).json({ message: "Banned User. Contact Admin !" });

  // From this point on, you can fetch nfts from Mongodb
  const domains = await DomainModel.find({ username }).lean().exec();
  if (!domains?.length)
    return res.status(404).json({ message: "No domains found." });

  res.json(domains);
};

// Aggregation Pipeline for USERS Stats

export const getUserDomainsCount: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { username } = req.params;
  const user = await UserModel.findOne({ username })
    .select("-password")
    .lean()
    .exec();
  if (!user) return res.status(404).json({ message: "User not found !" });
  const domainsCount = await DomainModel.aggregate([
    {
      $match: {
        username: `${username}`,
      },
    },
  ]).count("total");

  res.json(domainsCount);
};

// Aggregation Pipeline for Admin Stats

//1. getAllDomainsCount - This controller should respond with the numbers of docs from the Domains collection.

export const getAllDomainsCount: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const allDomainsCount = await DomainModel.aggregate().count("total");

  res.json(allDomainsCount);
};

// 2. getTodayDomainsCount - This controller should respond with the numbers of docs from the Domains collection whose createdAt field
// has a value of 24 hours or less. I.e all domains that were bought today.
export const getTodayDomainsCount: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const domainsCount = await DomainModel.aggregate([
    {
      $match: {
        $expr:
          // { $lt: [{ $dateDiff: { startDate: "$_id", endDate: "$$NOW", unit: "hour" } }, 24 ]}
          {
            $lt: [
              {
                $dateDiff: {
                  startDate: "$_id",
                  endDate: "$$NOW",
                  unit: "hour",
                },
              },
              24,
            ],
          },
      },
    },
    // {
    //   $addFields:{
    //     createdDate: {$toDate: "$createdAt"}
    //   }
    // },
    // {
    //   $project: {
    //     createdDate: {
    //       $dateFromString: {
    //         dateString: "$createdAt",
    //         onError: "$createdAt",
    //       },
    //     },
    //   },
    // },
    // {
    //   $match: {
    //     createdAt: new Date("2024-04-21T22:06:24.926Z"), // TODO: Replace with today's date object
    //     // createdAt: new Date('<YYYY-mm-ddTHH:MM:ssZ>'),
    //     // username: "zstain",
    //   },
    // },
  ]).count("total");

  res.json(domainsCount);
};

// Default format:  "%Y-%m-%dT%H:%M:%S.%LZ"
// use this format: "%Y-%m-%dZ"
//or
// use this format: "%Y-%m-%d"
//  format: "%d-%m-%Y"
