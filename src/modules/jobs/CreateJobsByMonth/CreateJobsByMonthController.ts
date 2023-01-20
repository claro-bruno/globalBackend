import { NextFunction, Request, Response } from "express";
import { CreateJobsByMonthUseCase } from "./CreateJobsByMonthUseCase";


export class CreateJobsByMonthController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const createJobsUseCase = new CreateJobsByMonthUseCase();
        const { month, year } = request.body;
        console.log(month, year);
        if(month && year) {
            const result = await createJobsUseCase.execute(month, year);
            return response.json(result);
        }
        else {
            return response.json("Error");
        }
    }
}