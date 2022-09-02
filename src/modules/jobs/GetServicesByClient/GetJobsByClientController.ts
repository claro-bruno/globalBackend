import { NextFunction, Request, Response } from "express";
import {GetJobsByClientUseCase} from "./GetJobsByClientUseCase";

export class GetJobsByClientController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const { id } = request.params;
        const getJobsByClientUseCase = new GetJobsByClientUseCase();
        const result = await getJobsByClientUseCase.execute(+id);

        return response.json(result);


    }
}