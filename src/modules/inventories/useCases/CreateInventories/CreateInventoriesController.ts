import { NextFunction, Request, Response } from "express";
import { CreateInventoriesUseCase } from "./CreateInventoriesUseCase";


export class CreateInventoriesController {
    async handle(request: Request, response: Response, next: NextFunction) {


        const { name, description, unit_cost, url_image, status } = request.body;
        const createMaterialsUseCase = new CreateInventoriesUseCase();


        const result = await createMaterialsUseCase.execute({ name, description, unit_cost: +unit_cost, url_image, status: 'active' });
        // return response.json(result);
        return response.status(201).send();


    }
}