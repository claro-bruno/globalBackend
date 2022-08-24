import { Router } from "express";
import { Request, Response, NextFunction } from "express-serve-static-core";
import {ensureAuthenticate} from "../middlewares/ensureAuthenticate";

import {CreateClientController} from "../modules/clients/useCases/CreateClient/CreateClientController";



const clientsRoutes = Router();

const use = (fn: Function) => async (req: Request, res: Response, next: NextFunction) => {
    await fn(req, res, next).catch(next)
}


const createClientController = new CreateClientController();

clientsRoutes.post("/", use(ensureAuthenticate), use(createClientController.handle));


export { clientsRoutes };
