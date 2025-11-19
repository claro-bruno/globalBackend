import { NextFunction, Request, Response } from "express";
import { UpdateTransactionsInventoriesUseCase } from "./UpdateTransactionsInventoriesUseCase";

export class UpdateTransactionsInventoriesController {
    async handle(request: Request, response: Response, next: NextFunction) {
        const { fk_id_inventory, quantity, total_cost, fk_id_client, sequence, description, created_at } = request.body;
        const { id } = request.params;
        const updateTransactionsInventoriesUseCase = new UpdateTransactionsInventoriesUseCase();
        const total = Number(total_cost);

        const result = await updateTransactionsInventoriesUseCase.execute({ id: +id, fk_id_inventory, quantity, total_cost: +total, fk_id_client, sequence, description, created_at });
        return response.json(result);





    }
}