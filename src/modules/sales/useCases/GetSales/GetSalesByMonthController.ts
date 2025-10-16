import { NextFunction, Request, Response } from "express";
import { GetSalesByMonthUseCase } from "./GetSalesByMonthUseCase";


export class GetSalesByMonthController {
    async handle(request: Request, response: Response, next: NextFunction) {
        const { month, year } = request.query;



        if (month && year) {
            const getSalesByMonthUseCase = new GetSalesByMonthUseCase();
            const result = await getSalesByMonthUseCase.execute({ month: month as string, year: +year });

            return response.json(result);
        }
        else if (year) {
            const getSalesByMonthUseCase = new GetSalesByMonthUseCase();
            const result = await getSalesByMonthUseCase.execute({ month: '', year: +year });

            return response.json(result);
        }



    }
}