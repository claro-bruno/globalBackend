import { NextFunction, Request, Response } from "express";
import { CreateInvoicesUseCase } from "./CreateInvoicesUseCase";


export class CreateInvoicesController {
    async handle(request: Request, response: Response, next: NextFunction) {

        const { date_invoice, value, identification, description, id_client, taxa, total_pago, data_pagamento, method, ref, id_order, quarter, contractor_id } = request.body;
        const createInvoicesUseCase = new CreateInvoicesUseCase();
        const result = await createInvoicesUseCase.execute({ date_invoice, value, identification, description, fk_id_client: id_client, taxa, total_pago, date_payment: data_pagamento, method, ref, fk_id_order: id_order, quarter, fk_id_contractor: contractor_id });
        return response.json(result);



    }
}