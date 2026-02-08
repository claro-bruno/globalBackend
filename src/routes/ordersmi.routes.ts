import { Router } from "express";
import { use } from "../middlewares/use";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { CreateOrderMaterialsInventoriesController } from "../modules/ordersMaterialsInventories/useCases/CreateOrdersMaterialsInventories/CreateOrderMaterialsInventoriesController";
import { UpdateOrderMaterialsInventoriesController } from "../modules/ordersMaterialsInventories/useCases/UpdateOrdersMaterialsInventories/UpdateOrderMaterialsInventoriesController";
import { GetAllOrdersMaterialsInventoriesController } from "../modules/ordersMaterialsInventories/useCases/GetAllOrdersMaterialsInventories/GetAllOrdersMaterialsInventoriesController";


const ordersmiRoutes = Router();


const createOrderMaterialsInventoriesController = new CreateOrderMaterialsInventoriesController();
const updateOrderMaterialsInventoriesController = new UpdateOrderMaterialsInventoriesController();
const getAllOrdersMaterialsInventoriesController = new GetAllOrdersMaterialsInventoriesController();

ordersmiRoutes.post("/", use(ensureAuthenticate), use(createOrderMaterialsInventoriesController.handle));
// ordersmiRoutes.get("/:id", use(ensureAuthenticate), use(getExpensiveController.handle));
ordersmiRoutes.get("/", use(ensureAuthenticate), use(getAllOrdersMaterialsInventoriesController.handle));
ordersmiRoutes.put("/:id", use(ensureAuthenticate), use(updateOrderMaterialsInventoriesController.handle));

export { ordersmiRoutes };