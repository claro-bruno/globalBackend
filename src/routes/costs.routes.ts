import { Router } from "express";
import { use } from "../middlewares/use";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { CreateCostController } from "../modules/costs/useCases/CreateCost/CreateCostController";
import { UpdateCostController } from "../modules/costs/useCases/UpdateCost/UpdateCostController";
import { GetCostController } from "../modules/costs/useCases/GetCost/GetCostController";
import { GetCostsController } from "../modules/costs/useCases/GetCosts/GetCostsController";



const costsRoutes = Router();


const createCostController = new CreateCostController();
const updateCostController = new UpdateCostController();
const getCostController = new GetCostController();
const getCostsController = new GetCostsController();

costsRoutes.post("/", use(ensureAuthenticate), use(createCostController.handle));
costsRoutes.put("/:id", use(ensureAuthenticate), use(updateCostController.handle));
costsRoutes.get("/:id", use(ensureAuthenticate), use(getCostController.handle));
costsRoutes.get("/", use(getCostsController.handle));


export { costsRoutes };