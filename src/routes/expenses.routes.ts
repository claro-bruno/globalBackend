import { Router } from "express";
import {use} from "../middlewares/use";

import {ensureAuthenticate} from "../middlewares/ensureAuthenticate";
import { CreateExpensivesController } from "../modules/payments/useCases/CreateExpensives/CreateExpensivesController";
import { GetExpensivesByMonthController } from "../modules/payments/useCases/GetExpensivesByMonth/GetExpensivesByMonthController";
import { GetExpensivesByYearController } from "../modules/payments/useCases/GetExpensivesByYear/GetExpensivesByYearController";
import { UpdateExpensivesController } from "../modules/payments/useCases/UpdateExpensives/UpdateExpensivesController";
import { GetExpensiveController } from "../modules/payments/useCases/GetExpensive/GetExpensiveController";

const expensesRoutes = Router();


const createExpensivesController = new CreateExpensivesController();
const getExpensivesByMonthController = new GetExpensivesByMonthController();
const getExpensivesByYearController = new GetExpensivesByYearController();
const updateExpensivesController = new UpdateExpensivesController();
const getExpensiveController = new GetExpensiveController();

expensesRoutes.post("/", use(ensureAuthenticate), use(createExpensivesController.handle));
expensesRoutes.get("/:id", use(ensureAuthenticate), use(getExpensiveController.handle));
expensesRoutes.get("/annual/:year", use(ensureAuthenticate), use(getExpensivesByYearController.handle));
expensesRoutes.get("/", use(ensureAuthenticate), use(getExpensivesByMonthController.handle));
expensesRoutes.put("/:id", use(ensureAuthenticate), use(updateExpensivesController.handle));

export { expensesRoutes };