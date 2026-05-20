import { Router } from "express";
import { use } from "../middlewares/use";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { CreateSalesController } from "../modules/sales/useCases/CreateSales/CreateSalesController";
import { UpdateSalesController } from "../modules/sales/useCases/UpdateSales/UpdateSalesController";
import { GetSalesByMonthController } from "../modules/sales/useCases/GetSales/GetSalesByMonthController";
import { GetAllSalesByMonthController } from "../modules/sales/useCases/GetAllSales/GetAllSalesByMonthController";
import { DeleteSalesController } from "../modules/sales/useCases/DeleteSales/DeleteSalesController";
const salesRoutes = Router();


const createSalesController = new CreateSalesController();
const updateSalesController = new UpdateSalesController();
const deleteSalesController = new DeleteSalesController();
// const getExpensivesByMonthController = new GetExpensivesByMonthController();
// const getExpensivesByYearController = new GetExpensivesByYearController();
// const updateExpensivesController = new UpdateExpensivesController();
const getSalesbyMonthController = new GetSalesByMonthController();
const getAllSalesController = new GetAllSalesByMonthController();

salesRoutes.post("/", use(ensureAuthenticate), use(createSalesController.handle));
// expensesRoutes.get("/:id", use(ensureAuthenticate), use(getExpensiveController.handle));
// expensesRoutes.get("/annual/:year", use(ensureAuthenticate), use(getExpensivesByYearController.handle));
salesRoutes.get("/", use(ensureAuthenticate), use(getSalesbyMonthController.handle));
salesRoutes.get("/all", use(ensureAuthenticate), use(getAllSalesController.handle));
salesRoutes.delete("/:id", use(ensureAuthenticate), use(deleteSalesController.handle));
salesRoutes.put("/:id", use(ensureAuthenticate), use(updateSalesController.handle));

export { salesRoutes };