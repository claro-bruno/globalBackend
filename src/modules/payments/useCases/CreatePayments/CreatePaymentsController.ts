import { NextFunction, Request, Response } from "express";
import { CreatePaymentsUseCase } from "./CreatePaymentsUseCase";

export class CreatePaymentsController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const { contractor_id, month, year, payments } = request.body;
        const creayePaymentsUseCase = new CreatePaymentsUseCase();
        console.log(request.body);

        if(contractor_id && month && year && payments) {
            const result = await creayePaymentsUseCase.execute({ contractor_id, month, year, payments });
            return response.json(result);
        }



    }
}