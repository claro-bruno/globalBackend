import { NextFunction, Request, Response } from "express";
import { CreateJobsUseCase } from "./CreateJobsUseCase";


export class CreateJobsController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const { id_client, id_contractor, sunday, monday, tuesday, wednesday, thursday, friday, saturday, value, value_hour  } = request.body;
        const createJobsUseCase = new CreateJobsUseCase();
        const result = await createJobsUseCase.execute({
            id_contractor: +id_contractor,
            id_client: +id_client,
            sunday,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            value: +value,
            value_hour: +value_hour
        });

        return response.json(result);


    }
}