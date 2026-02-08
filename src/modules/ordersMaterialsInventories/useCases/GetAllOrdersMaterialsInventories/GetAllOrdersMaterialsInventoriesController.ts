import { NextFunction, Request, Response } from "express";
import { GetAllOrdersMaterialsInventoriesUseCase } from "./GetAllOrdersMaterialsInventoriesUseCase";


export class GetAllOrdersMaterialsInventoriesController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {

        const getAllOrdersMaterialsInventoriesUseCase = new GetAllOrdersMaterialsInventoriesUseCase();
        const result = await getAllOrdersMaterialsInventoriesUseCase.execute();

        return response.json(result);



    }
}