import { NextFunction, Request, Response } from "express";
import { DeleteInventoriesSequenceUseCase } from "./DeleteInventoriesSequenceUseCase";

export class DeleteInventoriesSequenceController {
    async handle(request: Request, response: Response, next: NextFunction) {

        const { id } = request.params;

        const deleteInventoriesSequenceUseCase = new DeleteInventoriesSequenceUseCase();




        const result = await deleteInventoriesSequenceUseCase.execute({ id: +id });
        return response.json(result);




    }
}