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
import { GetClientsProfitController } from "../modules/clients/useCases/GetClientsProfit/GetClientsProfitController";
import { CreateClientContractorController } from "../modules/clients/useCases/CreateClientContractor/CreateClientContractorController";
import { UpdateClientContractorController } from "../modules/clients/useCases/UpdateClientContractor/UpdateClientContractorController";
import { GetClientsContractorController } from "../modules/clients/useCases/GetClientsContractor /GetClientsContractorController";
import { GetClientContractorController } from "../modules/clients/useCases/GetClientContractor/GetClientContractorController";
import { UpdateActiveClientContractorController } from "../modules/clients/useCases/UpdateActiveClientContractor /UpdateActiveClientContractorController";



const clientsRoutes = Router();
const createClientController = new CreateClientController();
const getClientsController = new GetClientsController();
const getClientController = new GetClientController();
const updateClientController = new UpdateClientController();
const updateStatusClientController = new UpdateStatusClientController();
const getClientsProfitController = new GetClientsProfitController();

const createClientContractorController = new CreateClientContractorController();
const updateClientContractorController = new UpdateClientContractorController();
const getClientsContractorController = new GetClientsContractorController();
const getClientContractorController = new GetClientContractorController();
const updateActiveClientContractorController = new UpdateActiveClientContractorController();

clientsRoutes.post("/contractor", use(ensureAuthenticate), use(createClientContractorController.handle));
clientsRoutes.post("/", use(ensureAuthenticate), use(createClientController.handle));
clientsRoutes.get("/profit", use(ensureAuthenticate), use(getClientsProfitController.handle));
clientsRoutes.put("/status/:id", use(ensureAuthenticate), use(updateStatusClientController.handle));
clientsRoutes.put("/contractor/:id", use(ensureAuthenticate), use(updateClientContractorController.handle));
clientsRoutes.put("/contractor/atual", use(ensureAuthenticate), use(updateActiveClientContractorController.handle));
clientsRoutes.put("/:id", use(ensureAuthenticate), use(updateClientController.handle));
clientsRoutes.get("/contractor/:id", use(ensureAuthenticate), use(getClientContractorController.handle));
clientsRoutes.get("/:id", use(ensureAuthenticate), use(getClientController.handle));
clientsRoutes.get("/contractor", use(ensureAuthenticate), use(getClientsContractorController.handle));
clientsRoutes.get("/", use(ensureAuthenticate), use(getClientsController.handle));


export { clientsRoutes };
