import { NextFunction, Request, Response } from "express";
import { CreateInvoicesUseCase } from "./CreateInvoicesUseCase";

export class CreateInvoicesController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        
        const { date_invoice, value, identification, description, id_client } = request.body;
        const createInvoicesUseCase = new CreateInvoicesUseCase();
        
        const result = await createInvoicesUseCase.execute({ date_invoice, value, identification, description, fk_id_client: +id_client });
        return response.json(result);



    }
}