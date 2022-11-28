import {NextFunction, Request, Response} from "express";
import {GetOrderUseCase} from "./GetOrderUseCase";


export class GetOrderController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response>  {
        const { id } = request.params;
        const getOrderUseCase = new GetOrderUseCase();
        const result = await getOrderUseCase.execute({
            id: +id
        });
        return response.json(result);
    }
}