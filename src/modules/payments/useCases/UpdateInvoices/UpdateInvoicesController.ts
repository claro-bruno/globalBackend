import { NextFunction, Request, Response } from "express";
import { UpdateInvoicesUseCase } from "./UpdateInvoicesUseCase";

export class UpdateInvoicesController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const { date_invoice, payed_for, value, method, identification, id_client } = request.body;
        const { id } = request.params;
        const updateInvoicesUseCase = new UpdateInvoicesUseCase();

        if(date_invoice && payed_for && value && method && method && identification && id) {
            const result = await updateInvoicesUseCase.execute({ date_invoice, payed_for, value, method, identification, fk_id_client: +id_client, id: +id });
            return response.json(result);
        }



    }
}