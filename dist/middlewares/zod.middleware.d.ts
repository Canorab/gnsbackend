import { type NextFunction, type Request, type Response } from "express";
import { z } from "zod";
export declare const validate: (schema: z.AnyZodObject) => (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
