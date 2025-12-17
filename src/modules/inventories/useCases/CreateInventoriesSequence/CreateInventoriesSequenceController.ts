import { NextFunction, Request, Response } from "express";
import { CreateInventoriesSequenceUseCase } from "./CreateInventoriesSequenceUseCase";


export class CreateInventoriesSequenceController {
    async handle(request: Request, response: Response, next: NextFunction) {


        const { created_at, seq, fk_id_inventory, fk_user } = request.body;
        const createMaterialsSequenceUseCase = new CreateInventoriesSequenceUseCase();
        const id_equipament = Number(fk_id_inventory.split("-")[0]);

        const result = await createMaterialsSequenceUseCase.execute({ created_at, fk_id_inventory: +id_equipament, fk_user });
        // return response.json(result);
        return response.status(201).send();


    }
}