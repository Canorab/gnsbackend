import { Chain, OpenSeaSDK } from "opensea-js";
import { NextFunction, Request, RequestHandler, Response } from "express";
import {
  domainsListSchemaType,
  fetchDomainsSchemaType,
} from "@/config/schema.zod";

import { domains } from "@/helpers/domainListSample";
import { ethers } from "ethers";

// This middlware should fetch a user's nft balances from opensea using the user's wallet address
// This middleware should append a data field of type object[] on the res and then call
// slug and contract are only needed to fetch the nfts from opensea
export const fetchDomains: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    wallet,
    slug,
    contract,
    rpcKey,
    apiKey,
  }: fetchDomainsSchemaType["body"] = req.body;

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
