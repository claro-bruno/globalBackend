import { Router } from "express";
import { use } from "../middlewares/use";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { CreateOrderMaterialsInventoriesController } from "../modules/ordersMaterialsInventories/useCases/CreateOrdersMaterialsInventories/CreateOrderMaterialsInventoriesController";
import { UpdateOrderMaterialsInventoriesController } from "../modules/ordersMaterialsInventories/useCases/UpdateOrdersMaterialsInventories/UpdateOrderMaterialsInventoriesController";
import { GetAllOrdersMaterialsInventoriesController } from "../modules/ordersMaterialsInventories/useCases/GetAllOrdersMaterialsInventories/GetAllOrdersMaterialsInventoriesController";
import { GetOrderMaterialsInventoriesController } from "../modules/ordersMaterialsInventories/useCases/GetOrderMaterialsInventories/GetOrderMaterialsInventoriesController";
import { UpdateInvoiceOrderController } from "../modules/ordersMaterialsInventories/useCases/UpdateInvoiceOrder/UpdateInvoiceOrderController";
import { UpdateStatusOrderController } from "../modules/ordersMaterialsInventories/useCases/UpdateStatusOrder/UpdateStatusOrderController";
import { UpdateCommentsOrderController } from "../modules/ordersMaterialsInventories/useCases/UpdateCommentsOrder/UpdateCommentsOrderController";
const ordersmiRoutes = Router();


const createOrderMaterialsInventoriesController = new CreateOrderMaterialsInventoriesController();
const updateOrderMaterialsInventoriesController = new UpdateOrderMaterialsInventoriesController();
const getAllOrdersMaterialsInventoriesController = new GetAllOrdersMaterialsInventoriesController();
const getOrderMaterialsInventoriesController = new GetOrderMaterialsInventoriesController();
const updateInvoiceOrderController = new UpdateInvoiceOrderController();
const updateStatusOrderController = new UpdateStatusOrderController();
const updateCommentsOrderController = new UpdateCommentsOrderController();
ordersmiRoutes.post("/", use(ensureAuthenticate), use(createOrderMaterialsInventoriesController.handle));
ordersmiRoutes.put("/invoice", use(ensureAuthenticate), use(updateInvoiceOrderController.handle));
ordersmiRoutes.put("/status", use(ensureAuthenticate), use(updateStatusOrderController.handle));
ordersmiRoutes.put("/comments", use(ensureAuthenticate), use(updateCommentsOrderController.handle));
ordersmiRoutes.put("/:id", use(ensureAuthenticate), use(updateOrderMaterialsInventoriesController.handle));
ordersmiRoutes.get("/:id", use(ensureAuthenticate), use(getOrderMaterialsInventoriesController.handle));
ordersmiRoutes.get("/", use(ensureAuthenticate), use(getAllOrdersMaterialsInventoriesController.handle));


export { ordersmiRoutes };