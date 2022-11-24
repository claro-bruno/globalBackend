import {NextFunction, Request, Response} from "express";
import {GetOrdersUseCase} from "./GetOrdersUseCase";


export class GetOrdersController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response>  {
        const getOrdersUseCase = new GetOrdersUseCase();
        const result = await getOrdersUseCase.execute();
        return response.json(result);
    }
}