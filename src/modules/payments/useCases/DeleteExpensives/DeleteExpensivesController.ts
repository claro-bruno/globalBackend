import { NextFunction, Request, Response } from "express";
import { DeleteExpensivesUseCase } from "./DeleteExpensivesUseCase";

export class DeleteExpensivesController {
    async handle(request: Request, response: Response, next: NextFunction) {

        const { id } = request.params;

        const deleteExpensivesUseCase = new DeleteExpensivesUseCase();




        const result = await deleteExpensivesUseCase.execute({ id: +id });
        return response.json(result);




    }
}