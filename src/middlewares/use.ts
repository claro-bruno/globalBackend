import { NextFunction, Request, Response } from "express-serve-static-core";

export const use =
  (fn: Function) => async (req: Request, res: Response, next: NextFunction) => {
    await fn(req, res, next).catch(next);
  };
