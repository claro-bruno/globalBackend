import { Router } from "express";
import {use} from "../middlewares/use";

import {ensureAuthenticate} from "../middlewares/ensureAuthenticate";
import { CreatePaymentsController } from "../modules/payments/useCases/CreatePayments/CreatePaymentsController";
import { GetPaymentsController } from "../modules/payments/useCases/GetPayments/GetPaymentsController";
import { CreateInvoiceController } from "../modules/payments/useCases/CreateInvoices/CreateInvoicesController";
import { CreateExpensivesController } from "../modules/payments/useCases/CreateExpensives/CreateExpensivesController";
import { GetAnualReportController } from "../modules/payments/useCases/GetAnualReport/GetAnualReportController";
import { GetExpensivesByMonthController } from "../modules/payments/useCases/GetExpensivesByMonth/GetExpensivesByMonthController";
import { GetExpensivesByYearController } from "../modules/payments/useCases/GetExpensivesByYear/GetExpensivesByYearController";
import { GetInvoicesByMonthController } from "../modules/payments/useCases/GetInvoicesByMonth/GetInvoicesByMonthController";
import { GetInvoicesByYearController } from "../modules/payments/useCases/GetInvoicesByYear/GetInvoicesByYearController";
import { UpdateInvoicesController } from "../modules/payments/useCases/UpdateInvoices/UpdateInvoicesController";
import { UpdateExpensivesController } from "../modules/payments/useCases/UpdateExpensives/UpdateExpensivesController";


const paymentsRoutes = Router();


const createPaymentsController = new CreatePaymentsController();
const getPaymentsController = new GetPaymentsController();
const getAnualReportController = new GetAnualReportController();



paymentsRoutes.post("/contractor", use(ensureAuthenticate), use(createPaymentsController.handle));
paymentsRoutes.get("/contractor", use(ensureAuthenticate), use(getPaymentsController.handle));
paymentsRoutes.get("/report", use(ensureAuthenticate), use(getAnualReportController.handle));



export { paymentsRoutes };