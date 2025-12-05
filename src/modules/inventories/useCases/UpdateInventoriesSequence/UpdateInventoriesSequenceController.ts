import { NextFunction, Request, Response } from "express";
import { UpdateInventoriesSequenceUseCase } from "./UpdateInventoriesSequenceUseCase";


export class UpdateInventoriesSequenceController {
    async handle(request: Request, response: Response, next: NextFunction) {


        const { created_at, seq, fk_id_inventory, status } = request.body;
        const { id } = request.params;
        const updateInventoriesSequenceUseCase = new UpdateInventoriesSequenceUseCase();


        const result = await updateInventoriesSequenceUseCase.execute({ id: +id, created_at, seq, fk_id_inventory, status });
        // return response.json(result);
        return response.status(201).send();


    }
}