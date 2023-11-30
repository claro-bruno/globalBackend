import { NextFunction, Request, Response } from "express";
import { GetCostUseCase } from "./GetCostUseCase";


export class GetCostController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        // const { month, year } = request.query;
        const { id } = request.params;
        const getCostUseCase = new GetCostUseCase();

        const result = await getCostUseCase.execute({
            id: +id
        });
        return response.json(result);


    }
}