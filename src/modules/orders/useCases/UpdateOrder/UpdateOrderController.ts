import {NextFunction, Request, Response} from "express";
import {UpdateOrderUseCase} from "./UpdateOrderUseCase";


export class UpdateOrderController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response>  {
        const { date_at, description, notes, id_client, start, end, colaborattors, support  } = request.body;
        const { id } = request.params;
        const updateOrderUseCase = new UpdateOrderUseCase();
        const result = await updateOrderUseCase.execute({
            id: +id,
            description,
            notes,
            id_client,
            start,
            end, 
            date_at,
            colaborattors, 
            support
        });
        return response.json(result);
    }
}
