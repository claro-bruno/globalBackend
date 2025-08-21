import { Router } from "express";
import { use } from "../middlewares/use";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { CreateOrderController } from "../modules/orders/useCases/CreateOrder/CreateOrderController";
import { UpdateOrderController } from "../modules/orders/useCases/UpdateOrder/UpdateOrderController";
import { GetOrderController } from "../modules/orders/useCases/GetOrder/GetOrderController";
import { GetOrdersController } from "../modules/orders/useCases/GetOrders/GetOrdersController";
import { GetAllOrdersController } from "../modules/orders/useCases/GetAllOrders/GetAllOrdersController";
import { UpdateInvoiceOrderController } from "../modules/orders/useCases/UpdateInvoiceOrder/UpdateInvoiceOrderController";



const ordersRoutes = Router();


const createOrderController = new CreateOrderController();
const updateOrderController = new UpdateOrderController();
const getOrderController = new GetOrderController();
const getOrdersController = new GetOrdersController();
const getAllOrdersController = new GetAllOrdersController();
const udateInvoiceOrderController = new UpdateInvoiceOrderController();

ordersRoutes.post("/", use(ensureAuthenticate), use(createOrderController.handle));
ordersRoutes.put("/invoice", use(ensureAuthenticate), use(udateInvoiceOrderController.handle));
ordersRoutes.put("/:id", use(ensureAuthenticate), use(updateOrderController.handle));
ordersRoutes.get("/orders", use(ensureAuthenticate), use(getAllOrdersController.handle));
ordersRoutes.get("/:id", use(ensureAuthenticate), use(getOrderController.handle));
ordersRoutes.get("/", use(ensureAuthenticate), use(getOrdersController.handle));


export { ordersRoutes };