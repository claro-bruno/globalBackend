import { NextFunction, Request, Response } from "express";
import { UpdateSalesUseCase } from "./UpdateSalesUseCase";


export class UpdateSalesController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const { name, contact, email, phone, region, status, bid, contractor_id, month, year, date_at } = request.body;
        const { id } = request.params;
        const updateSalesUseCase = new UpdateSalesUseCase();
        const result = await updateSalesUseCase.execute({
            contact,
            email,
            phone,
            region,
            status,
            bid,
            contractor: contractor_id,
            month,
            year,
            date_sales: date_at,
            id: +id,
            name
        });
        return response.json(result);
    }
}