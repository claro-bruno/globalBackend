import { NextFunction, Request, Response } from "express";
import { GetExpensivesByMonthUseCase } from "./GetExpensivesByMonthUseCase";

export class GetExpensivesByMonthController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const { month, year } = request.query;
        const getExpensivesByMonthUseCase = new GetExpensivesByMonthUseCase();
        if(month && year){
            const result = await getExpensivesByMonthUseCase.execute({ month: month as string, year: +year});
            return response.json(result);
        }

        
    }
}