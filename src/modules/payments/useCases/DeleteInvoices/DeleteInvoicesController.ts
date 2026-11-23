import { NextFunction, Request, Response } from "express";
import { DeleteInvoicesUseCase } from "./DeleteInvoicesUseCase";

export class DeleteInvoicesController {
    async handle(request: Request, response: Response, next: NextFunction) {

        const { id } = request.params;

        const deleteInvoicesUseCase = new DeleteInvoicesUseCase();




        const result = await deleteInvoicesUseCase.execute({ id: +id });
        return response.json(result);




    }
}