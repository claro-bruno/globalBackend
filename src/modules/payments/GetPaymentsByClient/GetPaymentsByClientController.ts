import { NextFunction, Request, Response } from "express";
import { GetPaymentsByClientUseCase } from "./GetPaymentsByClientUseCase";

export class GetPaymentsByClientController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const { month, year } = request.body;
        const getPaymentsByClientUseCase = new GetPaymentsByClientUseCase();
        const result = await getPaymentsByClientUseCase.execute(+year, month);

        return response.json(result);


    }
}