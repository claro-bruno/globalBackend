import { NextFunction, Request, Response } from "express";
import { UpdateInventoriesSequenceUseCase } from "./UpdateInventoriesSequenceUseCase";


export class UpdateInventoriesSequenceController {
    async handle(request: Request, response: Response, next: NextFunction) {


        const { created_at, fk_id_inventory, status, fk_user } = request.body;
        const { id } = request.params;
        const updateInventoriesSequenceUseCase = new UpdateInventoriesSequenceUseCase();
        const id_equipament = Number(fk_id_inventory.split("-")[0]);


        const result = await updateInventoriesSequenceUseCase.execute({ id: +id, created_at, fk_id_inventory: +id_equipament, status, fk_user });
        // return response.json(result);
        return response.status(201).send();


    }
}