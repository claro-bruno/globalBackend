import { NextFunction, Request, Response } from "express";
import { CreateExpensivesUseCase } from "./CreateExpensivesUseCase";

export class CreateExpensivesController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const { date_expensive, payed_for, value, method, identification, type } = request.body;
        const createExpensivesUseCase = new CreateExpensivesUseCase();

        if(date_expensive && payed_for && value && method && method && type) {
            const result = await createExpensivesUseCase.execute({ date_expensive, payed_for, value, method, identification, type });
            return response.json(result);
        }



    }
}