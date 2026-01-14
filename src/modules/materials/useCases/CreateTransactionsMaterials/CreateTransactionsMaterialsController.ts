import { NextFunction, Request, Response } from "express";
import { CreateTransactionsMaterialsUseCase } from "./CreateTransactionsMaterialsUseCase";


export class CreateTransactionsMaterialsController {
    async handle(request: Request, response: Response, next: NextFunction) {




        const { fk_id_material, quantity, total_cost, fk_id_input, fk_id_output, description, created_at, fk_user } = request.body;
        const createTransactionsMaterialsUseCase = new CreateTransactionsMaterialsUseCase();



        const result = await createTransactionsMaterialsUseCase.execute({
            fk_id_material,
            quantity,
            fk_id_input: fk_id_input.toString().length > 0 ? fk_id_input : 0,
            fk_id_output,
            description,
            created_at,
            fk_user
        });
        // return response.json(result);
        return response.status(201).send();


    }
}