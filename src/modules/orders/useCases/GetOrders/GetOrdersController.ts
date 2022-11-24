import {NextFunction, Request, Response} from "express";
import {GetOrdersUseCase} from "./GetOrdersUseCase";


export class GetOrderController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response>  {
        const { id } = request.params;
        const getOrdersUseCase = new GetOrdersUseCase();
        const result = await getOrdersUseCase.execute();
        return response.json(result);
    }
}