import { NextFunction, Request, Response } from "express";
import { CreateInvoicesUseCase } from "./CreateInvoicesUseCase";

export class CreateInvoiceController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const { date_invoice, payed_for, value, method, identification, id_client } = request.body;
        const createInvoicesUseCase = new CreateInvoicesUseCase();

        if(date_invoice && payed_for && value && method && method && identification) {
            const result = await createInvoicesUseCase.execute({ date_invoice, payed_for, value, method, identification, fk_id_client: +id_client });
            return response.json(result);
        }



    }
}