import {NextFunction, Request, Response} from "express";
import { GetClientsUseCase} from "./GetClientsUseCase";

export class GetClientsController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const getClientsUseCase = new GetClientsUseCase();
        const result = await getClientsUseCase.execute();

        return response.json(result);


    }
}