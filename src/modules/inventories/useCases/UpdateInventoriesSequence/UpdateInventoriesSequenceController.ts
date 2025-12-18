import { NextFunction, Request, Response } from "express";
import { UpdateInventoriesSequenceUseCase } from "./UpdateInventoriesSequenceUseCase";


export class UpdateInventoriesSequenceController {
    async handle(request: Request, response: Response, next: NextFunction) {


        const { created_at, fk_id_inventory, fk_user, seq } = request.body;
        const { id } = request.params;

        // console.log(request.body, 'update inventories sequence controller');

        const updateInventoriesSequenceUseCase = new UpdateInventoriesSequenceUseCase();
        const id_equipament = isNaN(fk_id_inventory) ? Number(fk_id_inventory.split("-")[0]) : fk_id_inventory;

        // console.log('id_equipament', id_equipament);
        const result = await updateInventoriesSequenceUseCase.execute({ id: +id, created_at, fk_id_inventory: +id_equipament, fk_user, seq });
        // return response.json(result);
        return response.status(201).send();


    }
}