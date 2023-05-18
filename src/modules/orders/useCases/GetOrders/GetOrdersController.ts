import {NextFunction, Request, Response} from "express";
import {GetOrdersUseCase} from "./GetOrdersUseCase";


export class GetOrdersController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const { month, year } = request.query;
        const getOrdersUseCase = new GetOrdersUseCase();
        // const result = await getOrdersUseCase.execute();
        // console.log(result,'sdasdsa')
        let result: any = [];
        if(month && year){
            result = await getOrdersUseCase.execute({
                year: +year,
                month: String(month),
                   
            });
            return response.json(result);
        }
        return response.json(result); 

        
    }
}