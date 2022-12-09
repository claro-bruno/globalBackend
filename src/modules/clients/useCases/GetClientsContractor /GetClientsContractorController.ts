import {NextFunction, Request, Response} from "express";
import { GetClientsContractorUseCase} from "./GetClientsContractorUseCase";

export class GetClientsContractorController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const getClientsContractorUseCase = new GetClientsContractorUseCase();
        const result = await getClientsContractorUseCase.execute();

        return response.json(result);


    }
}