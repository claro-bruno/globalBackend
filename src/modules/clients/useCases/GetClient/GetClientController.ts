import {NextFunction, Request, Response} from "express";
import { GetClientUseCase} from "./GetClientUseCase";

export class GetClientController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const { id } = request.params;
        const getClientUseCase = new GetClientUseCase();
        const result = await getClientUseCase.execute(+id);

        return response.json(result);


    }
}