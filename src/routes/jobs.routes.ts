import { Router } from "express";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { CreateJobsController } from "../modules/jobs/CreateJobs/CreateJobsController";
import { use } from "../middlewares/use";
import { GetJobsController } from "../modules/jobs/GetJobs/GetJobsController";
import { GetJobsByClientController } from "../modules/jobs/GetServicesByClient/GetJobsByClientController";
import { GetJobsByContractorController } from "../modules/jobs/GetJobsByContractor/GetJobsByContractorController";
import { CompleteJobsController } from "../modules/jobs/CompleteJobs/CompleteJobsController";
import { UpdateJobsController } from "../modules/jobs/UpdateJobs/UpdateJobsController";
import { CreateJobsByMonthController } from "../modules/jobs/CreateJobsByMonth/CreateJobsByMonthController";
import { UpdateTotalsController } from "../modules/jobs/updateTotals/UpdateTotalsController";
import { UpdateApController } from "../modules/jobs/updateAp/UpdateApController";

const jobsRoutes = Router();

const createServicesController = new CreateJobsController();
const getJobsController = new GetJobsController();
const getJobsByClientController = new GetJobsByClientController();
const getJobsByContractorController = new GetJobsByContractorController();
const completeJobsController = new CompleteJobsController();
const updateJobsController = new UpdateJobsController();
const createJobsByMonthController = new CreateJobsByMonthController();
const updateTotalsController = new UpdateTotalsController();
const updateApController = new UpdateApController();

jobsRoutes.post(
  "/",
  use(ensureAuthenticate),
  use(createServicesController.handle)
);
jobsRoutes.put(
  "/total",
  use(ensureAuthenticate),
  use(updateTotalsController.handle)
);
jobsRoutes.put(
  "/ap",
  use(ensureAuthenticate),
  use(updateApController.handle)
);
jobsRoutes.put(
  "/:id",
  use(ensureAuthenticate),
  use(completeJobsController.handle)
);

jobsRoutes.patch(
  "/:id",
  use(ensureAuthenticate),
  use(updateJobsController.handle)
);
jobsRoutes.get(
  "/contractor/:id",
  use(ensureAuthenticate),
  use(getJobsByContractorController.handle)
);
jobsRoutes.get(
  "/client/:id",
  use(ensureAuthenticate),
  use(getJobsByClientController.handle)
);
jobsRoutes.get("/", use(ensureAuthenticate), use(getJobsController.handle));
jobsRoutes.post("/crom", use(createJobsByMonthController.handle));


export { jobsRoutes };
