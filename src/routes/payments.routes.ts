import { Router } from "express";
import {use} from "../middlewares/use";

import {ensureAuthenticate} from "../middlewares/ensureAuthenticate";
import { CreatePaymentsController } from "../modules/payments/useCases/CreatePayments/CreatePaymentsController";
import { GetPaymentsController } from "../modules/payments/useCases/GetPayments/GetPaymentsController";


const paymentsRoutes = Router();


const createPaymentsController = new CreatePaymentsController();
const getPaymentsController = new GetPaymentsController();


paymentsRoutes.post("/", use(ensureAuthenticate), use(createPaymentsController.handle));
// accountsRoutes.post("/authentication", use(ensureAuthenticate), use(validateAuthentication.handle));
paymentsRoutes.get("/", use(ensureAuthenticate), use(getPaymentsController.handle));
// accountsRoutes.get("/contractor/:id", use(ensureAuthenticate), use(getJobsByContractorController.handle));
// accountsRoutes.put("/contractor/access/:id", use(ensureAuthenticate), use(updateAccountContractorController.handle));
// accountsRoutes.put("/contractor/password/:id", use(ensureAuthenticate), use(updatePasswordAccountContractorController.handle));

export { paymentsRoutes };