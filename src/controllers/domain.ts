import { NextFunction, Request, RequestHandler, Response } from "express";

export const addNewDomain: RequestHandler = async (
  req: Request,
  res: Response
) => {};

export const addManyDomains: RequestHandler = async (
  req: Request,
  res: Response
) => {};

export const getAllDomains: RequestHandler = async (
  req: Request,
  res: Response
) => {};

export const getUserDomains: RequestHandler = async (
  req: Request,
  res: Response
) => {};
