import { Router } from "express";
import { use } from "../middlewares/use";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { CreateInvoicesController } from "../modules/payments/useCases/CreateInvoices/CreateInvoicesController";
import { GetInvoicesByMonthController } from "../modules/payments/useCases/GetInvoicesByMonth/GetInvoicesByMonthController";
import { GetInvoicesByYearController } from "../modules/payments/useCases/GetInvoicesByYear/GetInvoicesByYearController";
import { UpdateInvoicesController } from "../modules/payments/useCases/UpdateInvoices/UpdateInvoicesController";
import { GetInvoiceController } from "../modules/payments/useCases/GetInvoice/GetInvoiceController";
import { GetInvoicesController } from "../modules/payments/useCases/GetInvoices/GetInvoicesController";

const invoicesRoutes = Router();

const createInvoicesController = new CreateInvoicesController();
const getInvoicesByMonthController = new GetInvoicesByMonthController();
const getInvoicesByYearController = new GetInvoicesByYearController();
const updateInvoicesController = new UpdateInvoicesController();
const getInvoiceController = new GetInvoiceController();
const getInvoicesController = new GetInvoicesController();

invoicesRoutes.post("/", use(ensureAuthenticate), use(createInvoicesController.handle));
// invoicesRoutes.get("/invoices", use(ensureAuthenticate), use(getInvoicesController.handle));
invoicesRoutes.get("/:id", use(ensureAuthenticate), use(getInvoiceController.handle));
invoicesRoutes.get("/annual/:year", use(ensureAuthenticate), use(getInvoicesByYearController.handle));

invoicesRoutes.get("/", use(ensureAuthenticate), use(getInvoicesByMonthController.handle));
invoicesRoutes.put("/:id", use(ensureAuthenticate), use(updateInvoicesController.handle));

export { invoicesRoutes };