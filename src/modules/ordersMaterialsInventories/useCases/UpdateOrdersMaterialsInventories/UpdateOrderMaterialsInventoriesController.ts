import { NextFunction, Request, Response } from "express";
import { UpdateOrderMaterialsInventoriesUseCase } from "./UpdateOrderMaterialsInventoriesUseCase";


export class UpdateOrderMaterialsInventoriesController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const { id, created_at, description, fk_client_id, fk_contractor_id, total, status, inventories, supplies } = request.body;
        const updateOrderMaterialsInventoriesUseCase = new UpdateOrderMaterialsInventoriesUseCase();

        const result = await updateOrderMaterialsInventoriesUseCase.execute({
            id,
            description,
            created_at,
            fk_id_client: + fk_client_id,
            fk_id_contractor: + fk_contractor_id,
            total,
            status,
            inventories,
            supplies
        });

        //return response.status(200).json({ message: "Ordem de materiais e inventários atualizada com sucesso!" });
        return response.json(result);
    }
}