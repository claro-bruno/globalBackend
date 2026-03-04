import { NextFunction, Request, Response } from "express";
import { GetOrderMaterialsInventoriesUseCase } from "./GetOrderMaterialsInventoriesUseCase";


export class GetOrderMaterialsInventoriesController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {

        const getOrderMaterialsInventoriesUseCase = new GetOrderMaterialsInventoriesUseCase();
        const { id } = request.params;
        const result = await getOrderMaterialsInventoriesUseCase.execute({
            id: +id
        });

        return response.json(result);


    }
}