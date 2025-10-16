import { NextFunction, Request, Response } from "express";
import { GetAllSalesByMonthUseCase } from "./GetAllSalesByMonthUseCase";


export class GetAllSalesByMonthController {
    async handle(request: Request, response: Response, next: NextFunction) {





        const getAllSalesByMonthUseCase = new GetAllSalesByMonthUseCase();
        const result = await getAllSalesByMonthUseCase.execute();

        return response.json(result);




    }
}