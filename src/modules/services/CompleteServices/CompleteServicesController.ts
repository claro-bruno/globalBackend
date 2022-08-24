import { NextFunction, Request, Response } from "express";
import { CreateServiceStartUseCase } from "./CompleteServicesUseCase";

export class CreateServiceControllerController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const { id } = request.params;
        const createServiceStartUseCase = new CreateServiceStartUseCase();
        const result = await createServiceStartUseCase.execute({
             id
        });

        return response.json(result);


    }
}