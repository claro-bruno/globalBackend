import {NextFunction, Request, Response} from "express";
import { GetClientsContractorByIdUseCase} from "./GetClientsContractorByIdUseCase";

export class GetClientsContractorByIdController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const { id } = request.params;
        const getClientsContractorByIdUseCase = new GetClientsContractorByIdUseCase();
        const result = await getClientsContractorByIdUseCase.execute({ id: +id });

        return response.json(result);


    }
}