import {NextFunction, Request, Response} from "express";
import {GetInvoiceUseCase} from "./GetInvoiceUseCase";


export class GetInvoiceController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response>  {
        const { id } = request.params;
        const getInvoiceUseCase = new GetInvoiceUseCase();
        const result = await getInvoiceUseCase.execute({
            id: +id
        });
        return response.json(result);
    }
}