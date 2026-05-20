import { NextFunction, Request, Response } from "express";
import { DeleteSalesUseCase } from "./DeleteSalesUseCase";

export class DeleteSalesController {
    async handle(request: Request, response: Response, next: NextFunction) {

        const { id } = request.params;

        const deleteSalesUseCase = new DeleteSalesUseCase();




        const result = await deleteSalesUseCase.execute({ id: +id });
        return response.json(result);




    }
}