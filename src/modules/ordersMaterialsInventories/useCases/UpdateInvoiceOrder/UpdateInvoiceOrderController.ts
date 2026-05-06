import {NextFunction, Request, Response} from "express";
import {UpdateInvoiceOrderUseCase} from "./UpdateInvoiceOrderUseCase";


export class UpdateInvoiceOrderController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response>  {
        const { id, invoice  } = request.body;
        const updateInvoiceOrderUseCase = new UpdateInvoiceOrderUseCase();
        const result = await updateInvoiceOrderUseCase.execute({
            id: +id,
            invoice
        });
        return response.json(result);
    }
}
