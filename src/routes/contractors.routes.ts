import { Router } from "express";
import multer from "multer";
import { UploadDocuments } from "../middlewares/UploadDocuments";
import { CreateContractorController } from "../modules/contractors/useCases/CreateContractor/CreateContractorController";
import { use } from "../middlewares/use";
import {ensureAuthenticate} from "../middlewares/ensureAuthenticate";
import {GetContractorsController} from "../modules/contractors/useCases/GetContractors/GetContractorsController";
import {GetContractorController} from "../modules/contractors/useCases/GetContractor/GetContractorController";
const contractorsRoutes = Router();

const createContractorController = new CreateContractorController();
const getContractorsController = new GetContractorsController();
const getContractorController = new GetContractorController();

contractorsRoutes.get("/:id", use(ensureAuthenticate), use(getContractorController.handle));
contractorsRoutes.get("/", use(ensureAuthenticate), use(getContractorsController.handle));
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