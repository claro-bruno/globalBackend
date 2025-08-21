import { NextFunction, Request, Response } from "express";
import { GetInvoicesUseCase } from "./GetInvoicesUseCase";

export class GetInvoicesController {
    async handle(request: Request, response: Response, next: NextFunction) {

        const getInvoicesUseCase = new GetInvoicesUseCase();
        const result = await getInvoicesUseCase.execute();

        return response.json(result);

    }
}