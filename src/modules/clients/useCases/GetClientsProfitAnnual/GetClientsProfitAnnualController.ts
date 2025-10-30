import { NextFunction, Request, Response } from "express";
import { GetClientsProfitAnnualUseCase } from "./GetClientsProfitAnnualUseCase";



export class GetClientsProfitAnnualController {
    async handle(request: Request, response: Response, next: NextFunction) {
        const { year } = request.query;
        if (year) {
            const getClientsProfitAnnualUseCase = new GetClientsProfitAnnualUseCase();
            const result = await getClientsProfitAnnualUseCase.execute({ year: +year });

            return response.json(result);
        }



    }
}