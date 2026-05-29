import { NextFunction, Request, Response } from "express";
import { UpdateSalesNotesUseCase } from "./UpdateSalesNotesUseCase";


export class UpdateSalesNotesController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const { notes } = request.body;
        const { id } = request.params;
        const updateSalesNotesUseCase = new UpdateSalesNotesUseCase();


        const result = await updateSalesNotesUseCase.execute({

            id: +id,
            notes
        });
        return response.json(result);
    }
}