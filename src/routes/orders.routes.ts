import { Router } from "express";
import { use } from "../middlewares/use";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { CreateOrderController } from "../modules/orders/useCases/CreateOrder/CreateOrderController";
import { UpdateOrderController } from "../modules/orders/useCases/UpdateOrder/UpdateOrderController";
import { GetOrderController } from "../modules/orders/useCases/GetOrder/GetOrderController";
import { GetOrdersController } from "../modules/orders/useCases/GetOrders/GetOrdersController";
import { GetAllOrdersController } from "../modules/orders/useCases/GetAllOrders/GetAllOrdersController";
import { GetAllOrders_Controller } from "../modules/orders/useCases/GetOrders_all/GetAllOrders_Controller";
import { UpdateInvoiceOrderController } from "../modules/orders/useCases/UpdateInvoiceOrder/UpdateInvoiceOrderController";
import { DeleteOrdersController } from "../modules/orders/useCases/DeleteOrders/DeleteOrdersController";


const ordersRoutes = Router();


const createOrderController = new CreateOrderController();
const updateOrderController = new UpdateOrderController();
const getOrderController = new GetOrderController();
const getOrdersController = new GetOrdersController();
const getAllOrdersController = new GetAllOrdersController();
const getAllOrders_Controller = new GetAllOrders_Controller();
const updateInvoiceOrderController = new UpdateInvoiceOrderController();
const deleteOrdersController = new DeleteOrdersController();

ordersRoutes.post("/", use(ensureAuthenticate), use(createOrderController.handle));
ordersRoutes.put("/invoice", use(ensureAuthenticate), use(updateInvoiceOrderController.handle));
ordersRoutes.put("/:id", use(ensureAuthenticate), use(updateOrderController.handle));
ordersRoutes.delete("/:id", use(ensureAuthenticate), use(deleteOrdersController.handle));
ordersRoutes.get("/orders", use(ensureAuthenticate), use(getAllOrdersController.handle));
ordersRoutes.get("/orders/all", use(ensureAuthenticate), use(getAllOrders_Controller.handle));
ordersRoutes.get("/:id", use(ensureAuthenticate), use(getOrderController.handle));
ordersRoutes.get("/", use(ensureAuthenticate), use(getOrdersController.handle));


export { ordersRoutes };