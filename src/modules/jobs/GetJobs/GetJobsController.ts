import { NextFunction, Request, Response } from "express";
import { GetJobsUseCase } from "./GetJobsUseCase";

export class GetJobsController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const getJobsUseCase = new GetJobsUseCase();
        const result = await getJobsUseCase.execute();

        return response.json(result);


    }
}