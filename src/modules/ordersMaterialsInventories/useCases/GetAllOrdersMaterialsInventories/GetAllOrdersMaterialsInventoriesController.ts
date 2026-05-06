import { NextFunction, Request, Response } from "express";
import { GetAllOrdersMaterialsInventoriesUseCase } from "./GetAllOrdersMaterialsInventoriesUseCase";


export class GetAllOrdersMaterialsInventoriesController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const { month, year } = request.query;
        const getAllOrdersMaterialsInventoriesUseCase = new GetAllOrdersMaterialsInventoriesUseCase();



        let result: any = [];
        if (month && year) {
            result = await getAllOrdersMaterialsInventoriesUseCase.execute({
                year: +year,
                month: String(month),

            });


        }
        return response.json(result);




    }
}