import { Router } from "express";
import { use } from "../middlewares/use";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { CreateOrderMaterialsInventoriesController } from "../modules/ordersMaterialsInventories/useCases/CreateOrdersMaterialsInventories/CreateOrderMaterialsInventoriesController";
import { UpdateOrderMaterialsInventoriesController } from "../modules/ordersMaterialsInventories/useCases/UpdateOrdersMaterialsInventories/UpdateOrderMaterialsInventoriesController";
import { GetAllOrdersMaterialsInventoriesController } from "../modules/ordersMaterialsInventories/useCases/GetAllOrdersMaterialsInventories/GetAllOrdersMaterialsInventoriesController";
import { GetOrderMaterialsInventoriesController } from "../modules/ordersMaterialsInventories/useCases/GetOrderMaterialsInventories/GetOrderMaterialsInventoriesController";


const ordersmiRoutes = Router();


const createOrderMaterialsInventoriesController = new CreateOrderMaterialsInventoriesController();
const updateOrderMaterialsInventoriesController = new UpdateOrderMaterialsInventoriesController();
const getAllOrdersMaterialsInventoriesController = new GetAllOrdersMaterialsInventoriesController();
const getOrderMaterialsInventoriesController = new GetOrderMaterialsInventoriesController();

ordersmiRoutes.post("/", use(ensureAuthenticate), use(createOrderMaterialsInventoriesController.handle));
ordersmiRoutes.put("/:id", use(ensureAuthenticate), use(updateOrderMaterialsInventoriesController.handle));
ordersmiRoutes.get("/:id", use(ensureAuthenticate), use(getOrderMaterialsInventoriesController.handle));
ordersmiRoutes.get("/", use(ensureAuthenticate), use(getAllOrdersMaterialsInventoriesController.handle));


export { ordersmiRoutes };