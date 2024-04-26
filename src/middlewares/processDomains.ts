import { NextFunction, Request, RequestHandler, Response } from "express";

/**
 * @description This function retrieves the array of domains passed on by the fetchDomains middleware from res.body and then; filter out the ones already in the user's record and pushes the newly added domains to the addDomain controller
 * @param req
 * @param res
 * @param next
 */
export const processDomains: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { domains } = res.locals;
  const data = JSON.stringify(domains);
  console.log(`Data received from the fetchDomains middleware.`, domains);
  next();
};
