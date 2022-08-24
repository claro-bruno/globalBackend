import { Router } from "express";
import {ensureAuthenticate} from "../middlewares/ensureAuthenticate";
import {CreateServicesController} from "../modules/services/CreateService/CreateServicesController";
import {use} from "../middlewares/use";


const servicesRoutes = Router();

const createServicesController = new CreateServicesController();


servicesRoutes.post("/", use(ensureAuthenticate), use(createServicesController.handle));


export { servicesRoutes };
