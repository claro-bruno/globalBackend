import { NextFunction, Request, Response } from "express";
import { UpdateJobsUseCase } from "./UpdateJobsUseCase";


export class UpdateJobsController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const { id } = request.params;
        const { id_client, id_contractor  } = request.body;

        const createJobsUseCase = new UpdateJobsUseCase();
        const result = await createJobsUseCase.execute({
            id: +id,
            id_contractor: +id_contractor,
            id_client: +id_client
        });

        return response.json(result);


    }
}