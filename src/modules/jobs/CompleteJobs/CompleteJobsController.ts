import { NextFunction, Request, Response } from "express";
import {CompleteJobsUseCase} from "./CompleteJobsUseCase";

export class CompleteJobsController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const { id } = request.params;
        const { month, year, valueHour, workedDaysInfos, quarter, status } = request.body;
        const completeJobsUseCase = new CompleteJobsUseCase();
        const result = await completeJobsUseCase.execute({
            id: +id,
            month,
            year: +year,
            valueHour: +valueHour,
            quarter: +quarter,
            status,
            workedDaysInfos
    });

        return response.json(result);


    }
}