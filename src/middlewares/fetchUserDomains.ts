import { Chain, OpenSeaSDK } from "opensea-js";
import { NextFunction, Request, RequestHandler, Response } from "express";

import { domains } from "@/helpers/domainListSample";
import { ethers } from "ethers";
import { fetchDomainsSchemaType } from "@/config/schema.zod";

// This middlware should fetch a user's nft balances from opensea using the user's wallet address
// This middleware should append a data field of type object[] on the res.locals
// slug and contract are only needed to fetch the nfts from opensea
// Use with the getUserDomains controller
// This middleware should sync and update a specific user's domains on the blockchain with mongodb.
// This will mostly be put to use when users are trying to view their domain list

// contract, rpcKey and Opensea Api key (apiKey) should come from .env, not the req body
export const fetchUserDomains: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { wallet, slug }: fetchDomainsSchemaType["body"] = req.body;

  // let { greet }: fetchDomainsSchemaType["body"] = req.body;
  // req.domains = [] // Domains fetched and receved from the opensea api are appended to the req object
  // const domains: domainsListSchemaType = [
  //   { name: "first NFT" },
  //   { name: "second NfT" },
  // ];
  // const fetchGreet = "Hello from fetchDomains Middleware";
  // res.locals.greet = fetchGreet;
  res.locals.domains = domains.nfts;

  next();
};
