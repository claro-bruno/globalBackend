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
import { ValidateAuthenticationController } from "../modules/accounts/ValidateAuthentication/ValidateAuthenticationController";
import { GetJobsController } from "../modules/jobs/GetJobs/GetJobsController";
import { GetJobsByContractorController } from "../modules/jobs/GetJobsByContractor/GetJobsByContractorController";

const accountsRoutes = Router();


const authenticateContractorController = new AuthenticateContractorController();
const updatePasswordAccountContractorController = new UpdatePasswordAccountContractorController();
const updateAccountContractorController = new UpdateAccountContractorController();
const validateAuthentication = new ValidateAuthenticationController();
const getJobsController = new GetJobsController();
const getJobsByContractorController = new GetJobsByContractorController();

accountsRoutes.post("/contractor", use(authenticateContractorController.handle));
accountsRoutes.post("/authentication", use(ensureAuthenticate), use(validateAuthentication.handle));
accountsRoutes.get("/", use(ensureAuthenticate), use(getJobsController.handle));
accountsRoutes.get("/contractor", use(ensureAuthenticate), use(getJobsByContractorController.handle));
accountsRoutes.put("/contractor/access/:id", use(ensureAuthenticate), use(updateAccountContractorController.handle));
accountsRoutes.put("/contractor/password/:id", use(ensureAuthenticate), use(updatePasswordAccountContractorController.handle));

export { accountsRoutes };