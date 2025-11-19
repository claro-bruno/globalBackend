import { NextFunction, Request, Response } from "express";
import { GetInventoriesUseCase } from "./GetInventoriesUseCase";

export class GetInventoriesController {
    async handle(request: Request, response: Response, next: NextFunction) {

        const getInventoriesUseCase = new GetInventoriesUseCase();
        const result = await getInventoriesUseCase.execute();

        return response.json(result);

    }
}