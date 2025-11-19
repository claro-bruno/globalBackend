import { NextFunction, Request, Response } from "express";
import { GetMaterialsUseCase } from "./GetMaterialsUseCase";

export class GetMaterialsController {
    async handle(request: Request, response: Response, next: NextFunction) {

        const getMaterialsUseCase = new GetMaterialsUseCase();
        const result = await getMaterialsUseCase.execute();

        return response.json(result);

    }
}