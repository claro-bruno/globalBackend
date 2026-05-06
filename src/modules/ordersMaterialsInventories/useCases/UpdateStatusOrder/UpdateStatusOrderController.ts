import { NextFunction, Request, Response } from "express";
import { UpdateStatusOrderUseCase } from "./UpdateStatusOrderUseCase";


export class UpdateStatusOrderController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const { id, status } = request.body;
        const updateStatusOrderUseCase = new UpdateStatusOrderUseCase();
        const result = await updateStatusOrderUseCase.execute({
            id: +id,
            status: status
        });
        return response.json(result);
    }
}
