import { Router } from "express";
import {use} from "../middlewares/use";

import {ensureAuthenticate} from "../middlewares/ensureAuthenticate";
import { CreatePaymentsController } from "../modules/payments/useCases/CreatePayments/CreatePaymentsController";
import { GetPaymentsController } from "../modules/payments/useCases/GetPayments/GetPaymentsController";


const paymentsRoutes = Router();


const createPaymentsController = new CreatePaymentsController();
const getPaymentsController = new GetPaymentsController();


paymentsRoutes.post("/contractor", use(ensureAuthenticate), use(createPaymentsController.handle));
paymentsRoutes.get("/contractor", use(ensureAuthenticate), use(getPaymentsController.handle));

export { paymentsRoutes };