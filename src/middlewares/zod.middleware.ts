import { query, type NextFunction, type Request, type Response } from "express";
import { z, AnyZodObject } from "zod";

export const validate =
  (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      // return res.status(400).json(error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: error.flatten(),
        });
      } else if (error instanceof Error) {
        const err = error as Error & { statusCode?: number };
        return res.status(err.statusCode ?? 400).json({
          message: error.message,
        });
        // return;
      }
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  };

// export function zodMiddleware(
//   err: unknown,
//   _req: Request,
//   res: Response,
//   _next: NextFunction
// ): Response<any, Record<string, any>> {
// if (err instanceof z.ZodError) {
//   return res.status(400).json({
//     error: err.flatten(),
//   });
//     // return;
//   } else if (err instanceof Error) {
//     const error = err as Error & { statusCode?: number };
//     return res.status(error.statusCode ?? 400).json({
//       message: err.message,
//     });
//     // return;
//   }
// return res.status(500).json({
//   message: "Internal server error",
// });
// }
