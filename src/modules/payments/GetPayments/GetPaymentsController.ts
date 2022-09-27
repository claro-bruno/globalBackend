import { NextFunction, Request, Response } from "express";
import { GetPaymentsUseCase } from "./GetPaymentsUseCase";

export class GetPaymentsController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const { month, year } = request.body;
        const getPaymentsUseCase = new GetPaymentsUseCase();
        const result = await getPaymentsUseCase.execute(+year, month);

        return response.json(result);


    }
}