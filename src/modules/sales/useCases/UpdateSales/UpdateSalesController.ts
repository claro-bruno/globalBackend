import { NextFunction, Request, Response } from "express";
import { UpdateSalesUseCase } from "./UpdateSalesUseCase";


export class UpdateSalesController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const { contact, email, phone, region, status, bid, contractor, month, year, date_sales } = request.body;
        const { id } = request.params;
        const updateSalesUseCase = new UpdateSalesUseCase();
        const result = await updateSalesUseCase.execute({
            contact,
            email,
            phone,
            region,
            status,
            bid,
            contractor,
            month,
            year,
            date_sales,
            id: +id
        });
        return response.json(result);
    }
}