import { NextFunction, Request, Response } from "express";
import { UpdateTotalsUseCase } from "./UpdateTotalsUseCase";


export class UpdateTotalsController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const { day, month, year, valor  } = request.body;

        const updateTotalsUseCase = new UpdateTotalsUseCase();
        const result = await updateTotalsUseCase.execute({
            day,
            month,
            year,
            valor
        });

        return response.json(result);


    }
}