import { NextFunction, Request, RequestHandler, Response } from "express";

import DomainModel from "@/models/domain";
import UserModel from "@/models/user";
import { getNewDomains } from "@/helpers/domainHelpers";
import { openseaGetUserNfts } from "@/helpers/web3Helpers";

export const updateUserDomains: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //   const { id } = req.params;
  const { wallet, username } = req.body;

  const user = await UserModel.findOne({ username }).select("-password").exec();
  if (!user) return res.status(409).json({ message: "User not found" });
  if (!user.active)
    return res.status(409).json({ message: "Banned User! Contact Admin." });

  // 1. Use the username to fetch the user's domains from the Domains collecton and save to const userDomains
  const ownedDomains = await DomainModel.find({ username }).exec();
  //   if (!userDomains?.length) return res.status(409).json({message: "No new domains found"})
  // 2. Use the wallet to fetch the user's nfts from the blockchain and save to const userNft
  const userNfts = await openseaGetUserNfts(wallet);
  // 3. Pass both arrays to the getNewDomains method and save the results to const newDomains
  const newDomains = getNewDomains(userNfts, ownedDomains);
  // 4. Map through newDomains and construct a newDomain object for each item
  //   if (!newDomains?.length)
  //     return res.status(409).json({ message: "No new domains found" });
  //5. create a new mongodb doc for using the constructed newDomain object
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

  //6. User's domains updated ! call next() to move to the controller

  next();
};
