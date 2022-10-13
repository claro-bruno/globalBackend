import { Router } from "express";
import {ensureAuthenticate} from "../middlewares/ensureAuthenticate";
import {CreateJobsController} from "../modules/jobs/CreateJobs/CreateJobsController";
import {use} from "../middlewares/use";
import {GetJobsController} from "../modules/jobs/GetJobs/GetJobsController";
import {GetJobsByClientController} from "../modules/jobs/GetServicesByClient/GetJobsByClientController";
import {GetJobsByContractorController} from "../modules/jobs/GetJobsByContractor/GetJobsByContractorController";
import {CompleteJobsController} from "../modules/jobs/CompleteJobs/CompleteJobsController";
import { UpdateJobsController } from "../modules/jobs/UpdateJobs/UpdateJobsController";


const jobsRoutes = Router();

const createServicesController = new CreateJobsController();
const getJobsController = new GetJobsController();
const getJobsByClientController = new GetJobsByClientController();
const getJobsByContractorController = new GetJobsByContractorController();
const completeJobsController = new CompleteJobsController();
const updateJobsController = new UpdateJobsController();

jobsRoutes.post("/", use(ensureAuthenticate), use(createServicesController.handle));
jobsRoutes.put("/:id", use(ensureAuthenticate), use(completeJobsController.handle));
jobsRoutes.patch("/:id", use(ensureAuthenticate), use(updateJobsController.handle));
jobsRoutes.get("/contractor/:id", use(ensureAuthenticate), use(getJobsByContractorController.handle));
jobsRoutes.get("/client/:id", use(ensureAuthenticate), use(getJobsByClientController.handle));
jobsRoutes.get("/", use(ensureAuthenticate), use(getJobsController.handle));
// jobsRoutes.get("/", use(getJobsController.handle));



export { jobsRoutes };
