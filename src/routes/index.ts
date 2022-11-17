import { Router } from "express";
import { Request, Response, NextFunction } from "express-serve-static-core";

import { accountsRoutes } from "./accounts.routes";
import { clientsRoutes } from "./clients.routes";
import { contractorsRoutes } from "./contractors.routes";
import { jobsRoutes } from "./jobs.routes";
import { paymentsRoutes } from "./payments.routes";

const router = Router();

router.get("/", (request, response) => {
  response.json("Testando API na AWS");
});

router.use("/account", accountsRoutes);
router.use("/contractor", contractorsRoutes);
router.use("/client", clientsRoutes);
router.use("/job", jobsRoutes);
router.use("/payment", paymentsRoutes);

export { router };
