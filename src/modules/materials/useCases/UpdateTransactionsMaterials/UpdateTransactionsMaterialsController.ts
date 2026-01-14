import { NextFunction, Request, Response } from "express";
import { UpdateTransactionsMaterialsUseCase } from "./UpdateTransactionsMaterialsUseCase";

export class UpdateTransactionsMaterialsController {
    async handle(request: Request, response: Response, next: NextFunction) {


        const { fk_id_material, quantity, total_cost, fk_id_input, fk_id_output, description, created_at, fk_user } = request.body;
        const { id } = request.params;
        const updateTransactionsMaterialsUseCase = new UpdateTransactionsMaterialsUseCase();


        const result = await updateTransactionsMaterialsUseCase.execute({
            id: +id,
            fk_id_material,
            quantity: +quantity,
            fk_id_input,
            fk_id_output,
            description,
            created_at,
            fk_user
        });
        return response.json(result);





    }
}