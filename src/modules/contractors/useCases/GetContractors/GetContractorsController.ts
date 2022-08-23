import {NextFunction, Request, Response} from "express";
import { GetContractorsUseCase} from "./GetContractorsUseCase";

export class GetContractorsController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const getContractorsUseCase = new GetContractorsUseCase();
        const result = await getContractorsUseCase.execute();

        return response.json(result);


    }
}