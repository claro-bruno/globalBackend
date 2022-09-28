import { NextFunction, Request, Response } from "express";
import { GetJobsUseCase } from "./GetJobsUseCase";

export class GetJobsController {
    async handle(request: Request, response: Response, next: NextFunction)  {

        const { month, year } = request.body;
        const getJobsUseCase = new GetJobsUseCase();
        const result = await getJobsUseCase.execute(+year, month);

        return response.json(result);


    }
}