import { NextFunction, Request, Response } from "express";
import { UpdateExpensivesUseCase } from "./UpdateExpensivesUseCase";

export class UpdateExpensivesController {
    async handle(request: Request, response: Response, next: NextFunction) {
        const { month, year, value, category, description } = request.body;
        const { id } = request.params;

        const updateExpensivesUseCase = new UpdateExpensivesUseCase();

        // if(date_expensive && payed_for && value && status && method && type && id) {
        const result = await updateExpensivesUseCase.execute({ month, year: +year, value: +value, category, description, id: +id });
        return response.json(result);
        // }



    }
}