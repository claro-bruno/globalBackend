import { NextFunction, Request, Response } from "express";
import { CreateSalesUseCase } from "./CreateSalesUseCase";


export class CreateSalesController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const { contact, email, phone, region, status, bid, contractor, month, year, date_sales } = request.body;
        const createSalesUseCase = new CreateSalesUseCase();
        const result = await createSalesUseCase.execute({
            contact,
            email,
            phone,
            region,
            status,
            bid,
            contractor,
            month,
            year,
            date_sales
        });
        return response.json(result);
    }
}