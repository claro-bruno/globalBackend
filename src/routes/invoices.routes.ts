import { Router } from "express";
import {use} from "../middlewares/use";

import {ensureAuthenticate} from "../middlewares/ensureAuthenticate";
import { CreateInvoiceController } from "../modules/payments/useCases/CreateInvoices/CreateInvoicesController";
import { GetInvoicesByMonthController } from "../modules/payments/useCases/GetInvoicesByMonth/GetInvoicesByMonthController";
import { GetInvoicesByYearController } from "../modules/payments/useCases/GetInvoicesByYear/GetInvoicesByYearController";
import { UpdateInvoicesController } from "../modules/payments/useCases/UpdateInvoices/UpdateInvoicesController";
import { GetInvoiceController } from "../modules/payments/useCases/GetInvoice/GetInvoiceController";

const invoicesRoutes = Router();

const createInvoiceController = new CreateInvoiceController();
const getInvoicesByMonthController = new GetInvoicesByMonthController();
const getInvoicesByYearController = new GetInvoicesByYearController();
const updateInvoicesController = new UpdateInvoicesController();
const getInvoiceController = new GetInvoiceController();



invoicesRoutes.post("/", use(ensureAuthenticate), use(createInvoiceController.handle));
invoicesRoutes.get("/:id", use(ensureAuthenticate), use(getInvoiceController.handle));
invoicesRoutes.get("/annual/:year", use(ensureAuthenticate), use(getInvoicesByYearController.handle));
invoicesRoutes.get("/", use(ensureAuthenticate), use(getInvoicesByMonthController.handle));
invoicesRoutes.put("/:id", use(ensureAuthenticate), use(updateInvoicesController.handle));

export { invoicesRoutes };