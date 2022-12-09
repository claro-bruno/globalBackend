import { NextFunction, Request, Response } from "express";
import { GetPaymentContractorDetailsUseCase } from "./GetPaymentContractorDetailsUseCase";

export class GetPaymentContractorDetailsController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const { id } = request.params;
        const { year, month } = request.query;
        const getPaymentContractorDetailsUseCase = new GetPaymentContractorDetailsUseCase();
        if(id && year && month) {
            const result = await getPaymentContractorDetailsUseCase.execute(+id, +year, month as string);
            return response.json(result);
        }

    }
}