import { Router } from "express";
import { use } from "../middlewares/use";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { CreateInventoriesController } from "../modules/inventories/useCases/CreateInventories/CreateInventoriesController";
import { UpdateInventoriesController } from "../modules/inventories/useCases/UpdateInventories/UpdatetInventoriesController";
import { GetInventoriesController } from "../modules/inventories/useCases/GetInventories/GetInventoriesController";

import { CreateTransactionsInventoriesController } from "../modules/inventories/useCases/CreateTransactionsInventories/CreateTransactionsInventoriesController";
import { UpdateTransactionsInventoriesController } from "../modules/inventories/useCases/UpdateTransactionsInventories/UpdateTransactionsInventoriesController";
import { GetTransactionsInventoriesController } from "../modules/inventories/useCases/GetTransacionsInventories/GetTransactionsInventoriesController";

import { CreateInventoriesSequenceController } from "../modules/inventories/useCases/CreateInventoriesSequence/CreateInventoriesSequenceController";
import { UpdateInventoriesSequenceController } from "../modules/inventories/useCases/UpdateInventoriesSequence/UpdateInventoriesSequenceController";
import { GetInventoriesSequenceController } from "../modules/inventories/useCases/GetInventoriesSequence/GetInventoriesSequenceController";

import { GetInventoriesLogController } from "../modules/inventories/useCases/GetInventoriesLog/GetInventoriesLogController";


// import { GetAllSalesByMonthController } from "../modules/sales/useCases/GetAllSales/GetAllSalesByMonthController";
const inventoriesRoutes = Router();


const createInventoriesController = new CreateInventoriesController();
const updateInventoriesController = new UpdateInventoriesController();
const getInventoriesController = new GetInventoriesController();

const getInventoriesLogController = new GetInventoriesLogController();

const createTransactionsInventoriesController = new CreateTransactionsInventoriesController();
const updateTransactionsInventoriesController = new UpdateTransactionsInventoriesController();
const getTransactionsInventoriesController = new GetTransactionsInventoriesController();

const createInventoriesSequenceController = new CreateInventoriesSequenceController();
const updateInventoriesSequenceController = new UpdateInventoriesSequenceController()
const getInventoriesSequenceController = new GetInventoriesSequenceController();



// const getExpensivesByYearController = new GetExpensivesByYearController();
// const updateExpensivesController = new UpdateExpensivesController();
// const getSalesbyMonthController = new GetSalesByMonthController();
// const getAllSalesController = new GetAllSalesByMonthController();

inventoriesRoutes.post("/transactions", use(ensureAuthenticate), use(createTransactionsInventoriesController.handle));
inventoriesRoutes.post("/sequence", use(ensureAuthenticate), use(createInventoriesSequenceController.handle));
inventoriesRoutes.post("/", use(ensureAuthenticate), use(createInventoriesController.handle));
// expensesRoutes.get("/:id", use(ensureAuthenticate), use(getExpensiveController.handle));
// expensesRoutes.get("/annual/:year", use(ensureAuthenticate), use(getExpensivesByYearController.handle));
inventoriesRoutes.get("/transactions", use(ensureAuthenticate), use(getTransactionsInventoriesController.handle));
inventoriesRoutes.get("/sequences", use(ensureAuthenticate), use(getInventoriesSequenceController.handle));
inventoriesRoutes.get("/logs", use(ensureAuthenticate), use(getInventoriesLogController.handle));
inventoriesRoutes.get("/", use(ensureAuthenticate), use(getInventoriesController.handle));
// salesRoutes.get("/all", use(ensureAuthenticate), use(getAllSalesController.handle));
inventoriesRoutes.put("/transactions/:id", use(ensureAuthenticate), use(updateTransactionsInventoriesController.handle));
inventoriesRoutes.put("/sequences/:id", use(ensureAuthenticate), use(updateInventoriesSequenceController.handle));
inventoriesRoutes.put("/:id", use(ensureAuthenticate), use(updateInventoriesController.handle));

export { inventoriesRoutes };