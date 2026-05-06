import { NextFunction, Request, Response } from "express";
import { UpdateCommentsOrderUseCase } from "./UpdateCommentsOrderUseCase";


export class UpdateCommentsOrderController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const { id, comments } = request.body;
        const updateCommentsOrderUseCase = new UpdateCommentsOrderUseCase();
        const result = await updateCommentsOrderUseCase.execute({
            id: +id,
            comments: comments
        });
        return response.json(result);
    }
}
