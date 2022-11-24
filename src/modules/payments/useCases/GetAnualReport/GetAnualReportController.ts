import {NextFunction, Request, Response} from "express";
import { GetAnualReportUseCase } from "./GetAnualReportUseCase";



export class GetAnualReportController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const { year } = request.params;
        if(year) {
            const getAnualReportUseCase = new GetAnualReportUseCase();
            const result = await getAnualReportUseCase.execute({ year: +year });

            return response.json(result);
        }
        


    }
}