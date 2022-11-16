import { NextFunction, Request, Response } from "express";
import { CreateJobsByQuartersUseCase } from "./CreateJobsByQuartersUseCase";


export class CreateJobsByQuartersController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const createJobsUseCase = new CreateJobsByQuartersUseCase();
        const result = await createJobsUseCase.execute();

        return response.json(result);


    }
}