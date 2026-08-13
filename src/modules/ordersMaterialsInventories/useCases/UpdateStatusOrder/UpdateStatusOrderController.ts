import { NextFunction, Request, Response } from "express";
import { UpdateStatusOrderUseCase } from "./UpdateStatusOrderUseCase";


export class UpdateStatusOrderController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const { id, status, fk_user } = request.body;
        const updateStatusOrderUseCase = new UpdateStatusOrderUseCase();
        const result = await updateStatusOrderUseCase.execute({
            id: +id,
            status: status,
            fk_user
        });
        return response.json(result);
    }
}
