import { NextFunction, Request, Response } from "express";
import { GetPaymentsUseCase } from "./GetPaymentsUseCase";

export class GetPaymentsController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const { month, year } = request.query;
        const getPaymentsUseCase = new GetPaymentsUseCase();
        if(month && year){
            const result = await getPaymentsUseCase.execute(+year, month as string);
            
            return response.json(result);
        }
        


    }
}