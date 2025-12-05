import { NextFunction, Request, Response } from "express";
import { GetInventoriesLogUseCase } from "./GetInventoriesLogUseCase";

export class GetInventoriesLogController {
    async handle(request: Request, response: Response, next: NextFunction) {

        const getInventoriesUseCase = new GetInventoriesLogUseCase();
        const result = await getInventoriesUseCase.execute();

        return response.json(result);

    }
}