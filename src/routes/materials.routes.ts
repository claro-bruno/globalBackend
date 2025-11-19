import { Router } from "express";
import { use } from "../middlewares/use";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { CreateMaterialsController } from "../modules/materials/useCases/CreateMaterials/CreateMaterialsController";
import { UpdateMaterialsController } from "../modules/materials/useCases/UpdateMaterials/UpdateMaterialsController";
import { GetMaterialsController } from "../modules/materials/useCases/GetMaterials/GetMaterialsController";
import { CreateTransactionsMaterialsController } from "../modules/materials/useCases/CreateTransactionsMaterials/CreateTransactionsMaterialsController";
import { UpdateTransactionsMaterialsController } from "../modules/materials/useCases/UpdateTransactionsMaterials/UpdateTransactionsMaterialsController";
import { GetTransactionsMaterialsController } from "../modules/materials/useCases/GetTransacionsMaterials/GetTransactionsMaterialsController";

const materialsRoutes = Router();


const createMaterialsController = new CreateMaterialsController();
const updateMaterialsController = new UpdateMaterialsController();
const getMaterialsController = new GetMaterialsController();

const createTransactionsMaterialsController = new CreateTransactionsMaterialsController();
const updateTransactionsMaterialsController = new UpdateTransactionsMaterialsController();
const getTransactionsMaterialsController = new GetTransactionsMaterialsController();

materialsRoutes.post("/transations", use(ensureAuthenticate), use(createTransactionsMaterialsController.handle));
materialsRoutes.post("/", use(ensureAuthenticate), use(createMaterialsController.handle));

// expensesRoutes.get("/:id", use(ensureAuthenticate), use(getExpensiveController.handle));
// expensesRoutes.get("/annual/:year", use(ensureAuthenticate), use(getExpensivesByYearController.handle));
materialsRoutes.get("/transactions", use(ensureAuthenticate), use(getTransactionsMaterialsController.handle));
materialsRoutes.get("/", use(ensureAuthenticate), use(getMaterialsController.handle));

// salesRoutes.get("/all", use(ensureAuthenticate), use(getAllSalesController.handle));
materialsRoutes.put("/transactions/:id", use(ensureAuthenticate), use(updateTransactionsMaterialsController.handle));

materialsRoutes.put("/:id", use(ensureAuthenticate), use(updateMaterialsController.handle));

export { materialsRoutes };