import { NextFunction, Request, Response } from "express";
import { UpdateCostUseCase } from "./UpdateCostUseCase";


export class UpdateCostController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const { date_at, cost } = request.body;
        const { id } = request.params;
        const updateCostUseCase = new UpdateCostUseCase();
        const result = await updateCostUseCase.execute({
            id: +id,
            date_at,
            cost,
        });
        return response.json(result);
    }
}
