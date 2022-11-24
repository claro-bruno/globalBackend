import { Router } from "express";
import {use} from "../middlewares/use";

import {ensureAuthenticate} from "../middlewares/ensureAuthenticate";
import { CreateExpensivesController } from "../modules/payments/useCases/CreateExpensives/CreateExpensivesController";
import { GetExpensivesByMonthController } from "../modules/payments/useCases/GetExpensivesByMonth/GetExpensivesByMonthController";
import { GetExpensivesByYearController } from "../modules/payments/useCases/GetExpensivesByYear/GetExpensivesByYearController";
import { UpdateExpensivesController } from "../modules/payments/useCases/UpdateExpensives/UpdateExpensivesController";
import { GetExpensiveController } from "../modules/payments/useCases/GetExpensive/GetExpensiveController";

const expensivesRoutes = Router();


const createExpensivesController = new CreateExpensivesController();
const getExpensivesByMonthController = new GetExpensivesByMonthController();
const getExpensivesByYearController = new GetExpensivesByYearController();
const updateExpensivesController = new UpdateExpensivesController();
const getExpensiveController = new GetExpensiveController();

expensivesRoutes.post("/", use(ensureAuthenticate), use(createExpensivesController.handle));
expensivesRoutes.get("/:id", use(ensureAuthenticate), use(getExpensiveController.handle));
expensivesRoutes.get("/annual/:year", use(ensureAuthenticate), use(getExpensivesByYearController.handle));
expensivesRoutes.get("/", use(ensureAuthenticate), use(getExpensivesByMonthController.handle));
expensivesRoutes.put("/:id", use(ensureAuthenticate), use(updateExpensivesController.handle));

export { expensivesRoutes };