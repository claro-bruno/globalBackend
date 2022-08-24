import { Router } from "express";
import { AuthenticateContractorController } from "../modules/accounts/AuthenticateContractor/AuthenticateContractorController";
import {use} from "../middlewares/use";

const accountsRoutes = Router();


const authenticateContractorController = new AuthenticateContractorController();

accountsRoutes.post("/contractor", use(authenticateContractorController.handle));

export { accountsRoutes };