import { NextFunction, Request, Response } from "express";
import { CreateSalesUseCase } from "./CreateSalesUseCase";


export class CreateSalesController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const { name, contact, email, phone, region, status, bid, contractor_id, month, year, date_at } = request.body;

        const createSalesUseCase = new CreateSalesUseCase();
        const result = await createSalesUseCase.execute({
            name,
            contact,
            email,
            phone,
            region,
            status,
            bid,
            contractor_id,
            month,
            year,
            date_at
        });

        return response.json(result);
    }
}