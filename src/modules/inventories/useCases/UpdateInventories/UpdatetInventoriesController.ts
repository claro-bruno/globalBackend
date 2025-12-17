import { NextFunction, Request, Response } from "express";
import { UpdateInventoriesUseCase } from "./UpdateInventoriesUseCase";

export class UpdateInventoriesController {
    async handle(request: Request, response: Response, next: NextFunction) {
        const { name, description, unit_cost, url_image, status, created_at } = request.body;
        const { id } = request.params;
        const updateInventoriesUseCase = new UpdateInventoriesUseCase();
        const cost = Number(unit_cost);

        const result = await updateInventoriesUseCase.execute({ id: +id, name, description, unit_cost: +cost, url_image, status, created_at });
        return response.json(result);





    }
}