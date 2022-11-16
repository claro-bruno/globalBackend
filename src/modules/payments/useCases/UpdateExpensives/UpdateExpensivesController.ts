import { NextFunction, Request, Response } from "express";
import { UpdateExpensivesUseCase } from "./UpdateExpensivesUseCase";

export class UpdateExpensivesController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const { date_expensive, payed_for, value, method, identification, type, status } = request.body;
        const { id } = request.params;
        const updateExpensivesUseCase = new UpdateExpensivesUseCase();

        if(date_expensive && payed_for && value && method && method && type && id) {
            const result = await updateExpensivesUseCase.execute({ date_expensive, payed_for, value, method, identification, type, status, id: +id });
            return response.json(result);
        }



    }
}