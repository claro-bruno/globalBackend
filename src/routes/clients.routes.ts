import { Router } from "express";
import {ensureAuthenticate} from "../middlewares/ensureAuthenticate";
import {use} from "../middlewares/use";

import {CreateClientController} from "../modules/clients/useCases/CreateClient/CreateClientController";
import {GetClientsController} from "../modules/clients/useCases/GetClients/GetClientsController";
import {GetClientController} from "../modules/clients/useCases/GetClient/GetClientController";
import {UpdateClientController} from "../modules/clients/useCases/UpdateClient/UpdateClientController";
import {
    UpdateStatusClientController
} from "../modules/clients/useCases/UpdateStatusClient/UpdateStatusClientController";



const clientsRoutes = Router();
const createClientController = new CreateClientController();
const getClientsController = new GetClientsController();
const getClientController = new GetClientController();
const updateClientController = new UpdateClientController();
const updateStatusClientController = new UpdateStatusClientController();

clientsRoutes.post("/", use(ensureAuthenticate), use(createClientController.handle));
clientsRoutes.put("/status/:id", use(ensureAuthenticate), use(updateStatusClientController.handle));
clientsRoutes.put("/:id", use(ensureAuthenticate), use(updateClientController.handle));
clientsRoutes.get("/:id", use(ensureAuthenticate), use(getClientController.handle));
clientsRoutes.get("/", use(ensureAuthenticate), use(getClientsController.handle));

export { clientsRoutes };
