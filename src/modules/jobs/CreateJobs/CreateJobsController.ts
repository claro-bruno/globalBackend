import { NextFunction, Request, Response } from "express";
import { CreateJobsUseCase } from "./CreateJobsUseCase";


export class CreateJobsController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const { id_client, id_contractor , year, month , sunday, monday, tuesday, wednesday, thursday, friday, saturday, hours, start, end, value_hour  } = request.body;
        const createJobsUseCase = new CreateJobsUseCase();
        const result = await createJobsUseCase.execute({
            id_contractor: +id_contractor,
            id_client: +id_client,
            yearFull: +year,
            monthFull: month,
            sunday,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            value: +hours,
            value_hour: +value_hour,
            start,
            end
        });

        return response.json(result);


    }
}