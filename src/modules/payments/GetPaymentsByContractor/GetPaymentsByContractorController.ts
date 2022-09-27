import { NextFunction, Request, Response } from "express";
import { GetPaymentsByContractorUseCase } from "./GetPaymentsByContractorUseCase";

export class GetPaymentsByClientController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const { month, year } = request.body;
        const getPaymentsByContractorUseCase = new GetPaymentsByContractorUseCase();
        const result = await getPaymentsByContractorUseCase.execute(+year, month);

        return response.json(result);


    }
}