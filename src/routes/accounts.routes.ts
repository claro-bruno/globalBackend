import { Router } from "express";
import { Request, Response, NextFunction } from "express-serve-static-core";
import { AuthenticateContractorController } from "../modules/accounts/AuthenticateContractor/AuthenticateContractorController";


const accountsRoutes = Router();
const use = (fn: Function) => async (req: Request, res: Response, next: NextFunction) => {
    await fn(req, res, next).catch(next)
}


const authenticateContractorController = new AuthenticateContractorController();

accountsRoutes.post("/contractor", use(authenticateContractorController.handle));

export { accountsRoutes };