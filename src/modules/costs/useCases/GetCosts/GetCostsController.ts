import { NextFunction, Request, Response } from "express";
import { GetCostsUseCase } from "./GetCostsUseCase";


export class GetCostsController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const { month, year } = request.query;
        const getCostsUseCase = new GetCostsUseCase();
        // const result = await getOrdersUseCase.execute();
        // console.log(result,'sdasdsa')
        let result: any = [];
        if (month && year) {
            result = await getCostsUseCase.execute({
                year: +year,
                month: String(month),

            });
            return response.json(result);
        }
        return response.json(result);


    }
}