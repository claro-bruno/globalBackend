import { NextFunction, Request, Response } from "express";
import { GetPaymentsContractorsUseCase } from "./GetPaymentsContractorsUseCase";

export class GetPaymentsContractorsController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const { year, month } = request.query;
        const getPaymentsContractorsUseCase = new GetPaymentsContractorsUseCase();
        if(year && month) {
            const result = await getPaymentsContractorsUseCase.execute(+year, month as string);
            return response.json(result);
        }

    }
}