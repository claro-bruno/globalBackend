import { NextFunction, Request, Response } from "express";
import { GetInvoicesByYearUseCase } from "./GetInvoicesByYearUseCase";

export class GetInvoicesByYearController {
    async handle(request: Request, response: Response, next: NextFunction) {
        const { year } = request.params;
        console.log("TESTETE")
        if (year) {
            const getInvoicesByYearUseCase = new GetInvoicesByYearUseCase();
            const result = await getInvoicesByYearUseCase.execute({ year: +year });

            return response.json(result);
        }



    }
}