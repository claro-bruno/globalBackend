import { Router } from "express";
import multer from "multer";

import { uploadDocuments } from "./middlewares/UploadDocuments";

import { CreateContractorController } from "./modules/contractors/useCases/CreateContractor/CreateContractorController";
import { CreateContractorUploadController } from "./modules/contractors/useCases/CreateContractorUpload/CreateContractorUploadController";
import { AuthenticateContractorController } from "./modules/accounts/AuthenticateContractor/AuthenticateContractorController";

const routes = Router();


const createContractorController = new CreateContractorController();
const createContractorUploadController = new CreateContractorUploadController();
const authenticateContractorController = new AuthenticateContractorController();

routes.post("/account/contractor", authenticateContractorController.handle);

routes.get("/", (request, response) => {
    response.json("Testando API");
});
routes.post("/contractor",
    createContractorController.handle);
routes.put("/contractor/documents/:id",
    multer(uploadDocuments.getConfig).single("imgAddress1"),
    multer(uploadDocuments.getConfig).single("imgAddress2"),
    multer(uploadDocuments.getConfig).single("imgDocument"),
    createContractorUploadController.handle);

export { routes };