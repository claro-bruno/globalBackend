import { Router } from "express";
import multer from "multer";
import { Request, Response, NextFunction } from "express-serve-static-core";
import {UploadDocuments} from "../middlewares/UploadDocuments";
import {CreateContractorController} from "../modules/contractors/useCases/CreateContractor/CreateContractorController";

const contractorsRoutes = Router();
const createContractorController = new CreateContractorController();

const use = (fn: Function) => async (req: Request, res: Response, next: NextFunction) => {
    await fn(req, res, next).catch(next)
}

contractorsRoutes.post("/",
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
);

export { contractorsRoutes };