import {NextFunction, Request, Response} from "express";
import { GetInvoicesByMonthUseCase} from "./GetInvoicesByMonthUseCase";

export class GetInvoicesByMonthController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const { month, year } = request.query;
        if(month && year) {
            const getInvoicesByMonthUseCase = new GetInvoicesByMonthUseCase();
            const result = await getInvoicesByMonthUseCase.execute({ month: month as string, year: +year});

            return response.json(result);
        }
        


    }
}