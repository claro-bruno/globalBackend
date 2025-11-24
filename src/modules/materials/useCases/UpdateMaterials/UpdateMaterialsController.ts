import { NextFunction, Request, Response } from "express";
import { UpdateMaterialsUseCase } from "./UpdateMaterialsUseCase";

export class UpdateMaterialsController {
    async handle(request: Request, response: Response, next: NextFunction) {
        const { name, description, unit_cost, url_image, status, date_at } = request.body;
        const { id } = request.params;
        const updateMaterialsUseCase = new UpdateMaterialsUseCase();
        const cost = Number(unit_cost);



        const result = await updateMaterialsUseCase.execute({ id: +id, name, description, unit_cost: +cost, url_image, status, created_at: date_at });
        return response.json(result);





    }
}