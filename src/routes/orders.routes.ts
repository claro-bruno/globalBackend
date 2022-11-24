import { Router } from "express";
import {use} from "../middlewares/use";

import {ensureAuthenticate} from "../middlewares/ensureAuthenticate";
import { CreateOrderController } from "../modules/orders/useCases/CreateOrder/CreateOrderController";
import { UpdateOrderController } from "../modules/orders/useCases/UpdateOrder/UpdateOrderController";
import { GetOrderController } from "../modules/orders/useCases/GetOrder/GetOrderController";
import { GetOrdersController } from "../modules/orders/useCases/GetOrders/GetOrdersController";



const ordersRoutes = Router();


const createOrderController = new CreateOrderController();
const updateOrderController = new UpdateOrderController();
const getOrderController =  new GetOrderController();
const getOrdersController = new GetOrdersController();

ordersRoutes.post("/", use(ensureAuthenticate), use(createOrderController.handle));
ordersRoutes.put("/", use(ensureAuthenticate), use(updateOrderController.handle));
ordersRoutes.get("/:id", use(ensureAuthenticate), use(getOrderController.handle));
ordersRoutes.get("/", use(ensureAuthenticate), use(getOrdersController.handle));

export { ordersRoutes };