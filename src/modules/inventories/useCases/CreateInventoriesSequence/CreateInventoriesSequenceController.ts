import { NextFunction, Request, Response } from "express";
import { CreateInventoriesSequenceUseCase } from "./CreateInventoriesSequenceUseCase";


export class CreateInventoriesSequenceController {
    async handle(request: Request, response: Response, next: NextFunction) {


        const { created_at, seq, fk_id_inventory } = request.body;
        const createMaterialsSequenceUseCase = new CreateInventoriesSequenceUseCase();


        console.log(request.body, 'create inventories sequence controller');
        const result = await createMaterialsSequenceUseCase.execute({ created_at, seq, fk_id_inventory });
        // return response.json(result);
        return response.status(201).send();


    }
}