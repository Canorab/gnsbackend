import { NextFunction, Request, RequestHandler, Response } from "express";

import DomainModel from "@/models/domain";
import UserModel from "@/models/user";
import { getNewDomains } from "@/helpers/domainHelpers";
import { openseaGetUserNfts } from "@/helpers/web3Helpers";

export const updateAllUsersDomains: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Fetch all users
  const users = await UserModel.find().select("-password").exec();
  if (!users) return res.status(409).json({ message: "No Users to Update." });

  // Loop through and for each user, fetch their nfts and owned domains
  users.map(async (user) => {
    const ownedDomains = await DomainModel.find({
      username: user.username,
    }).exec();
    const userNfts = await openseaGetUserNfts(user.wallet);
    const newDomains = getNewDomains(userNfts, ownedDomains);
    if (newDomains?.length) {
      newDomains.map(async (item) => {
        const newDomainDoc = {
          userId: user._id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          name: item.name,
          image_url: item.image_url,
          identfier: item.identifier,
          wallet: user.wallet,
          data: {
            name: item.name,
            description: item.description,
            image_url: item.image_url,
            identifier: item.identifier,
          },
        };

        const result = await DomainModel.create(newDomainDoc);
        console.log("New domain added:", result);
      });
      // Update user's domainCount
      // const results = await UserModel.updateOne(
      //   { _id: user._id },
      //   { domainsCount: userDomains.length }
      // ).exec();
    }
  });

  next();
};
