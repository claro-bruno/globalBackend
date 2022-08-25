import { Router } from "express";
import { AuthenticateContractorController } from "../modules/accounts/AuthenticateContractor/AuthenticateContractorController";
import {use} from "../middlewares/use";
import {
    UpdatePasswordAccountContractorController
} from "../modules/accounts/UpdatePasswordAccountContractor/UpdatePasswordAccountContractorController";
import {ensureAuthenticate} from "../middlewares/ensureAuthenticate";
import {
    UpdateAccountContractorController
} from "../modules/accounts/UpdateAccountContractor/UpdateAccountContractorController";

const accountsRoutes = Router();


const authenticateContractorController = new AuthenticateContractorController();
const updatePasswordAccountContractorController = new UpdatePasswordAccountContractorController();
const updateAccountContractorController = new UpdateAccountContractorController();

accountsRoutes.post("/contractor", use(authenticateContractorController.handle));
accountsRoutes.put("/contractor/access/:id", use(ensureAuthenticate), use(updateAccountContractorController.handle));
accountsRoutes.put("/contractor/password/:id", use(ensureAuthenticate), use(updatePasswordAccountContractorController.handle));

export { accountsRoutes };