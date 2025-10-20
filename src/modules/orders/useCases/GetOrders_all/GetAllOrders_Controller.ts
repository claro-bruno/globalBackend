import { NextFunction, Request, Response } from "express";
import { GetAllOrders_UseCase } from "./GetAllOrders_UseCase";


export class GetAllOrders_Controller {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const getAllOrders_UseCase = new GetAllOrders_UseCase();
        let result: any = [];
        result = await getAllOrders_UseCase.execute()
        return response.json(result);


    }
}