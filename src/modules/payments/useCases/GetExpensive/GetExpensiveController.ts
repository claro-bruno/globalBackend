import {NextFunction, Request, Response} from "express";
import {GetExpensiveUseCase} from "./GetExpensiveUseCase";


export class GetExpensiveController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response>  {
        const { id } = request.params;
        const getExpensiveUseCase = new GetExpensiveUseCase();
        const result = await getExpensiveUseCase.execute({
            id: +id
        });
        return response.json(result);
    }
}