import { NextFunction, Request, Response } from "express";
import { UpdateInvoicesUseCase } from "./UpdateInvoicesUseCase";

export class UpdateInvoicesController {
    async handle(request: Request, response: Response, next: NextFunction) {
        const { date_invoice, value, identification, description, id_client, taxa, total_pago, data_pagamento, method, ref, id_order, quarter } = request.body;
        const { id } = request.params;
        const updateInvoicesUseCase = new UpdateInvoicesUseCase();

        const result = await updateInvoicesUseCase.execute({ date_invoice, value, identification, description, fk_id_client: +id_client, id: +id, taxa, total_pago, date_payment: data_pagamento, method, ref, fk_id_order: id_order, quarter });
        return response.json(result);




    }
}