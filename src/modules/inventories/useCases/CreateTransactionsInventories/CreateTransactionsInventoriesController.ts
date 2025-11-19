import { NextFunction, Request, Response } from "express";
import { CreateTransactionsInventoriesUseCase } from "./CreateTransactionsInventoriesUseCase";


export class CreateTransactionsInventoriesController {
    async handle(request: Request, response: Response, next: NextFunction) {


        const { fk_id_inventory, quantity, total_cost, fk_id_client, sequence, description, created_at } = request.body;
        const createTransactionsInventoriesUseCase = new CreateTransactionsInventoriesUseCase();


        const result = await createTransactionsInventoriesUseCase.execute({
            fk_id_inventory,
            quantity,
            total_cost,
            fk_id_client,
            sequence,
            description,
            created_at
        });
        // return response.json(result);
        return response.status(201).send();


    }
}