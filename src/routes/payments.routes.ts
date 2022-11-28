import { Router } from "express";
import {use} from "../middlewares/use";

import {ensureAuthenticate} from "../middlewares/ensureAuthenticate";
import { CreatePaymentsController } from "../modules/payments/useCases/CreatePayments/CreatePaymentsController";
import { GetPaymentsController } from "../modules/payments/useCases/GetPayments/GetPaymentsController";
import { GetAnualReportController } from "../modules/payments/useCases/GetAnualReport/GetAnualReportController";


const paymentsRoutes = Router();


const createPaymentsController = new CreatePaymentsController();
const getPaymentsController = new GetPaymentsController();
const getAnualReportController = new GetAnualReportController();



paymentsRoutes.post("/contractor", use(ensureAuthenticate), use(createPaymentsController.handle));
paymentsRoutes.get("/contractor", use(ensureAuthenticate), use(getPaymentsController.handle));
paymentsRoutes.get("/report/:year", use(ensureAuthenticate), use(getAnualReportController.handle));



export { paymentsRoutes };