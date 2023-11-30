import { NextFunction, Request, Response } from "express";
import { CreateCostUseCase } from "./CreateCostUseCase";


export class CreateCostController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const { date_at, cost } = request.body;
        const createCostUseCase = new CreateCostUseCase();
        const result = await createCostUseCase.execute({
            date_at,
            cost
        });
        return response.json(result);
    }
}
