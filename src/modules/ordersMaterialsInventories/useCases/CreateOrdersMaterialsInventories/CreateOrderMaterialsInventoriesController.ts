import { NextFunction, Request, Response } from "express";
import { CreateOrderMaterialsInventoriesUseCase } from "./CreateOrderMaterialsInventoriesUseCase";


export class CreateOrderMaterialsInventoriesController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const { created_at, description, fk_client_id, fk_contractor_id, total, status, inventories, supplies } = request.body;

        console.log('request.body', request.body)
        const createOrderMaterialsInventoriesUseCase = new CreateOrderMaterialsInventoriesUseCase();
        const result = await createOrderMaterialsInventoriesUseCase.execute({
            description,
            created_at,
            fk_id_client: +fk_client_id,
            fk_id_contractor: +fk_contractor_id,
            total,
            status,
            inventories,
            supplies
        });
        return response.json(result);
        // return response.json({ message: 'ok' })
    }
}