import { Router } from "express";
import multer from "multer";
import { UploadDocuments } from "../middlewares/UploadDocuments";
import { CreateContractorController } from "../modules/contractors/useCases/CreateContractor/CreateContractorController";
import { use } from "../middlewares/use";
const contractorsRoutes = Router();

const createContractorController = new CreateContractorController();


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