import { Router } from "express";
import {ensureAuthenticate} from "../middlewares/ensureAuthenticate";
import {use} from "../middlewares/use";
import {CreateClientController} from "../modules/clients/useCases/CreateClient/CreateClientController";



const clientsRoutes = Router();
const createClientController = new CreateClientController();

clientsRoutes.post("/", use(ensureAuthenticate), use(createClientController.handle));


export { clientsRoutes };
