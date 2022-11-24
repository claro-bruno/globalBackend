import { NextFunction, Request, Response } from "express";
import { GetExpensivesByMonthUseCase } from "./GetExpensivesByYearUseCase";

export class GetExpensivesByYearController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const { year } = request.params;
        const getExpensivesByMonthUseCase = new GetExpensivesByMonthUseCase();
        if(year){
            const result = await getExpensivesByMonthUseCase.execute({ year: +year });
            return response.json(result);
        }

        
    }
}