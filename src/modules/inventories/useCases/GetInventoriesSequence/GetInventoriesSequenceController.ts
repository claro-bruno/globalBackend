import { NextFunction, Request, Response } from "express";
import { GetInventoriesSequenceUseCase } from "./GetInventoriesSequenceUseCase";

export class GetInventoriesSequenceController {
    async handle(request: Request, response: Response, next: NextFunction) {

        const getInventoriesSequenceUseCase = new GetInventoriesSequenceUseCase();
        const result = await getInventoriesSequenceUseCase.execute();


        return response.json(result);

    }
}