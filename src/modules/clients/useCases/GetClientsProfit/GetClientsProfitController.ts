import {NextFunction, Request, Response} from "express";
import { GetClientsProfitUseCase} from "./GetClientsProfitUseCase";



export class GetClientsProfitController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const { month, year } = request.query;
        if(month && year) {
            const getClientsProfitUseCase = new GetClientsProfitUseCase();
            const result = await getClientsProfitUseCase.execute({ month: month as string, year: +year});

            return response.json(result);
        }
        


    }
}