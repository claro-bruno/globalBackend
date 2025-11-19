import { NextFunction, Request, Response } from "express";
import { GetTransactionsMaterialsUseCase } from "./GetTransactionsMaterialsUseCase";

export class GetTransactionsMaterialsController {
    async handle(request: Request, response: Response, next: NextFunction) {

        const getTransactionsMaterialsUseCase = new GetTransactionsMaterialsUseCase();
        const result = await getTransactionsMaterialsUseCase.execute();

        return response.json(result);

    }
}