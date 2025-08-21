import { Router } from "express";
import { use } from "../middlewares/use";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { CreatePaymentsController } from "../modules/payments/useCases/CreatePayments/CreatePaymentsController";
import { GetPaymentsController } from "../modules/payments/useCases/GetPayments/GetPaymentsController";
import { GetAnualReportController } from "../modules/payments/useCases/GetAnualReport/GetAnualReportController";
import { GetPaymentContractorDetailsController } from "../modules/payments/useCases/GetPaymentContractorDetails/GetPaymentContractorDetailsController";
import { GetPaymentsContractorsController } from "../modules/payments/useCases/GetPaymentsContractors/GetPaymentsContractorsController";

const paymentsRoutes = Router();


const createPaymentsController = new CreatePaymentsController();
const getPaymentsController = new GetPaymentsController();
const getAnualReportController = new GetAnualReportController();
const getPaymentContractorDetailsController = new GetPaymentContractorDetailsController();
const getPaymentsContractorsController = new GetPaymentsContractorsController();


paymentsRoutes.get("/invoice/:id", use(ensureAuthenticate), use(getPaymentContractorDetailsController.handle));
paymentsRoutes.post("/contractor", use(ensureAuthenticate), use(createPaymentsController.handle));
paymentsRoutes.get("/contractor", use(ensureAuthenticate), use(getPaymentsController.handle));
paymentsRoutes.get("/report/:year", use(ensureAuthenticate), use(getAnualReportController.handle));
paymentsRoutes.get("/invoice", use(ensureAuthenticate), use(getPaymentsContractorsController.handle));
paymentsRoutes.get("/invoice/all", use(ensureAuthenticate), use(getPaymentsContractorsController.handle));


export { paymentsRoutes };