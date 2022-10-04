import { NextFunction, Request, Response } from "express";
import { GetJobsUseCase } from "./GetJobsUseCase";

export class GetJobsController {
    async handle(request: Request, response: Response, next: NextFunction)  {

        const { month, year } = request.query;
        const getJobsUseCase = new GetJobsUseCase();
        if(month && year) {
            let result: any = await getJobsUseCase.execute(+year, month as string);
            return response.json(result);
        }
        

        


    }
}
