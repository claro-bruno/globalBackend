import { NextFunction, Request, Response } from "express";
import { DeleteExpensivesUseCase } from "./DeleteExpensivesUseCase";

export class DeleteExpensivesController {
    async handle(request: Request, response: Response, next: NextFunction) {

        const { id } = request.params;

        const deleteExpensivesUseCase = new DeleteExpensivesUseCase();

        // if(date_expensive && payed_for && value && status && method && type && id) {
        // const result = await deleteExpensivesUseCase.execute({ id: +id });
        // return response.json(result);
        // }



    }
}