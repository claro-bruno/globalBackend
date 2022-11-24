import { Router } from "express";
import multer from "multer";
import { UploadDocuments } from "../middlewares/UploadDocuments";
import { CreateContractorController } from "../modules/contractors/useCases/CreateContractor/CreateContractorController";
import { use } from "../middlewares/use";
import {ensureAuthenticate} from "../middlewares/ensureAuthenticate";
import {GetContractorsController} from "../modules/contractors/useCases/GetContractors/GetContractorsController";
import {GetContractorController} from "../modules/contractors/useCases/GetContractor/GetContractorController";
import { UpdateContractorController } from "../modules/contractors/useCases/UpdateContractor/UpdateContractorController";
const contractorsRoutes = Router();

const createContractorController = new CreateContractorController();
const getContractorsController = new GetContractorsController();
const getContractorController = new GetContractorController();
const updateContractorController = new UpdateContractorController();

contractorsRoutes.get("/:id", use(ensureAuthenticate), use(getContractorController.handle));
contractorsRoutes.get("/", use(ensureAuthenticate), use(getContractorsController.handle));
// use(ensureAuthenticate)
contractorsRoutes.put("/:id",
        use(ensureAuthenticate),
        multer(new UploadDocuments()).fields(
        [
            {
                name: 'primaryResidencyProof',
            },
            {
                name: 'documentProof',

            },
            {
                name: 'profile',

            }
        ]),
    use(updateContractorController.handle)
);
contractorsRoutes.post("/",
    multer(new UploadDocuments()).fields(
        [
            {
                name: 'primaryResidencyProof',
            },
            {
                name: 'secondaryResidencyProof',

            },
            {
                name: 'documentProof',

            },
            {
                name: 'profile',

            }
        ]),
    use(createContractorController.handle)
);

export { contractorsRoutes };