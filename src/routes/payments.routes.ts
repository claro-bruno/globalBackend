import { Router } from "express";
import {use} from "../middlewares/use";

import {ensureAuthenticate} from "../middlewares/ensureAuthenticate";
import { CreatePaymentsUseCase } from "../modules/payments/useCases/CreatePayments/CreatePaymentsUseCase";
import { CreatePaymentsController } from "../modules/payments/useCases/CreatePayments/CreatePaymentsController";
// import {
//     UpdateAccountContractorController
// } from "../modules/accounts/UpdateAccountContractor/UpdateAccountContractorController";
// import { ValidateAuthenticationController } from "../modules/accounts/ValidateAuthentication/ValidateAuthenticationController";
// import { GetJobsController } from "../modules/jobs/GetJobs/GetJobsController";
// import { GetJobsByContractorController } from "../modules/jobs/GetJobsByContractor/GetJobsByContractorController";

const paymentsRoutes = Router();


const createPaymentsController = new CreatePaymentsController();
// const updatePasswordAccountContractorController = new UpdatePasswordAccountContractorController();
// const updateAccountContractorController = new UpdateAccountContractorController();
// const validateAuthentication = new ValidateAuthenticationController();
// const getJobsController = new GetJobsController();
// const getJobsByContractorController = new GetJobsByContractorController();

paymentsRoutes.post("/", use(ensureAuthenticate), use(createPaymentsController.handle));
// accountsRoutes.post("/authentication", use(ensureAuthenticate), use(validateAuthentication.handle));
// accountsRoutes.get("/", use(ensureAuthenticate), use(getJobsController.handle));
// accountsRoutes.get("/contractor/:id", use(ensureAuthenticate), use(getJobsByContractorController.handle));
// accountsRoutes.put("/contractor/access/:id", use(ensureAuthenticate), use(updateAccountContractorController.handle));
// accountsRoutes.put("/contractor/password/:id", use(ensureAuthenticate), use(updatePasswordAccountContractorController.handle));

export { paymentsRoutes };