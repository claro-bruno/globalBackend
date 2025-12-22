import { NextFunction, Request, Response } from "express";
import { UpdateTransactionsInventoriesUseCase } from "./UpdateTransactionsInventoriesUseCase";

export class UpdateTransactionsInventoriesController {
    async handle(request: Request, response: Response, next: NextFunction) {

        const { fk_id_inventory_sequence, fk_id_client, description, created_at, fk_user, status } = request.body;
        const { id } = request.params;
        const updateTransactionsInventoriesUseCase = new UpdateTransactionsInventoriesUseCase();
        // console.log('UpdateTransactionsInventoriesController', request.body);


        const result = await updateTransactionsInventoriesUseCase.execute({ id: +id, fk_id_inventory_sequence, fk_id_client, description, created_at, fk_user: +fk_user, status });
        return response.json(result);





    }
}