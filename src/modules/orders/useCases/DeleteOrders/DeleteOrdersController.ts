import { NextFunction, Request, Response } from "express";
import { DeleteOrdersUseCase } from "./DeleteOrdersUseCase";

export class DeleteOrdersController {
    async handle(request: Request, response: Response, next: NextFunction) {

        const { id } = request.params;

        const deleteOrdersUseCase = new DeleteOrdersUseCase();




        const result = await deleteOrdersUseCase.execute({ id: +id });
        return response.json(result);




    }
}