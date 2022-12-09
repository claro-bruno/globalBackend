import { NextFunction, Request, Response } from "express";
import { GetPaymentContractorDetailsUseCase } from "./GetPaymentContractorDetailsUseCase";

export class GetPaymentContractorDetailsController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const { id } = request.params;

        const getPaymentContractorDetailsUseCase = new GetPaymentContractorDetailsUseCase();
        if(id) {
            const result = await getPaymentContractorDetailsUseCase.execute(+id);
            return response.json(result);
        }

    }
}