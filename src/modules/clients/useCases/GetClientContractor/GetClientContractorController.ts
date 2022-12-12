import {NextFunction, Request, Response} from "express";
import { GetClientContractorUseCase} from "./GetClientContractorUseCase";

export class GetClientContractorController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const { id } = request.params;
        const getClientContractorUseCase = new GetClientContractorUseCase();
        const result = await getClientContractorUseCase.execute(+id);

        return response.json(result);


    }
}