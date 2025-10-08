import { NextFunction, Request, Response } from "express";
import { CreateExpensivesUseCase } from "./CreateExpensivesUseCase";

export class CreateExpensivesController {
    async handle(request: Request, response: Response, next: NextFunction) {
        const { month, year, value, category, description } = request.body;
        const createExpensivesUseCase = new CreateExpensivesUseCase();


        const result = await createExpensivesUseCase.execute({ month, year: +year, value, category, description });
        return response.json(result);




    }
}