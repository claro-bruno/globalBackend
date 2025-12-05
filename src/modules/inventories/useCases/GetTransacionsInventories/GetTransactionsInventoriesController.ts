import { NextFunction, Request, Response } from "express";
import { GetTransactionsInventoriesUseCase } from "./GetTransactionsInventoriesUseCase";

export class GetTransactionsInventoriesController {
    async handle(request: Request, response: Response, next: NextFunction) {

        const getTransactionsInventoriesUseCase = new GetTransactionsInventoriesUseCase();
        const result = await getTransactionsInventoriesUseCase.execute();




        return response.json(result);

    }
}