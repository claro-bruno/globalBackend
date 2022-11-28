import { Router } from "express";

import { accountsRoutes } from "./accounts.routes";
import { clientsRoutes } from "./clients.routes";
import { contractorsRoutes } from "./contractors.routes";
import { jobsRoutes } from "./jobs.routes";
import { paymentsRoutes } from "./payments.routes";
import { invoicesRoutes } from "./invoices.routes";
import { expensesRoutes } from "./expenses.routes";
import { ordersRoutes } from "./orders.routes";
const router = Router();

router.get("/", (request, response) => {
  response.json("Testando API na AWS");
});

router.use("/account", accountsRoutes);
router.use("/contractor", contractorsRoutes);
router.use("/client", clientsRoutes);
router.use("/job", jobsRoutes);
router.use("/payment", paymentsRoutes);
router.use("/invoice", invoicesRoutes);
router.use("/expense", expensesRoutes);
router.use("/order", ordersRoutes);

export { router };
