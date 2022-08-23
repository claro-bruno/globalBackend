import { Router } from "express";
import { Request, Response, NextFunction } from "express-serve-static-core";



const servicesRoutes = Router();

const use = (fn: Function) => async (req: Request, res: Response, next: NextFunction) => {
    await fn(req, res, next).catch(next)
}

export { servicesRoutes };
