import { NextFunction, Request, Response } from "express";
import { UpdateTransactionsMaterialsUseCase } from "./UpdateTransactionsMaterialsUseCase";

export class UpdateTransactionsMaterialsController {
    async handle(request: Request, response: Response, next: NextFunction) {

        // console.log('UpdateTransactionsMaterialsController', request.body);
        const { fk_id_material, quantity, total_cost, fk_id_input, fk_id_output, description, created_at } = request.body;
        const { id } = request.params;
        const updateTransactionsMaterialsUseCase = new UpdateTransactionsMaterialsUseCase();
        const total = Number(total_cost);

        const result = await updateTransactionsMaterialsUseCase.execute({ id: +id, fk_id_material, quantity: +quantity, total_cost: +total, fk_id_input, fk_id_output, description, created_at });
        return response.json(result);





    }
}