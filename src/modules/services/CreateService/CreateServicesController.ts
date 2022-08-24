import { NextFunction, Request, Response } from "express";
import { CreateServicesUseCase } from "./CreateServicesUseCase";

export class CreateServicesController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const { idClient, idContractor, sunday, monday, tuesday, thursday, friday, saturday, value, month, year, quarter  } = request.body;
        const createServicesUseCase = new CreateServicesUseCase();
        const result = await createServicesUseCase.execute({
            idClient
        });

        return response.json('');


    }
}