import {NextFunction, Response, Router} from "express";
import multer from "multer";

import { UploadDocuments } from "../middlewares/UploadDocuments";
import { CreateContractorController } from "../modules/contractors/useCases/CreateContractor/CreateContractorController";
import { CreateContractorUploadController } from "../modules/contractors/useCases/CreateContractorUpload/CreateContractorUploadController";
import { AuthenticateContractorController } from "../modules/accounts/AuthenticateContractor/AuthenticateContractorController";
import {Request} from "express-serve-static-core";

const routes = Router();
const use = (fn: Function) => async (req: Request, res: Response, next: NextFunction) => {
    await fn(req, res, next).catch(next)
}

const createContractorController = new CreateContractorController();
// const createContractorUploadController = new CreateContractorUploadController();
const authenticateContractorController = new AuthenticateContractorController();

routes.post("/account/contractor", use(authenticateContractorController.handle));

routes.get("/", (request, response) => {
    response.json("Testando API");
});
routes.post("/contractor",
    multer(new UploadDocuments()).fields(
        [
            {
                name: 'primaryResidencyProf',
            },
            {
                name: 'secondaryResidencyProf',

            },
            {
                name: 'documentProf',

            },
            {
                name: 'profile',

            }
        ]),
    use(createContractorController.handle)
//
);

export { routes };