import { NextFunction, Request, Response } from "express";
import { GetAllOrdersUseCase } from "./GetAllOrdersUseCase";


export class GetAllOrdersController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {

        const getAllOrdersUseCase = new GetAllOrdersUseCase();
        const result = await getAllOrdersUseCase.execute();

        return response.json(result);



    }
}