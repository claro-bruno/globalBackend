import { NextFunction, Request, Response } from "express";
import { CreateMaterialsUseCase } from "./CreateMaterialsUseCase";


export class CreateMaterialsController {
    async handle(request: Request, response: Response, next: NextFunction) {


        const { name, description, unit_cost, url_image } = request.body;
        const createMaterialsUseCase = new CreateMaterialsUseCase();


        const result = await createMaterialsUseCase.execute({ name, description, unit_cost, url_image });
        // return response.json(result);
        return response.status(201).send();


    }
}