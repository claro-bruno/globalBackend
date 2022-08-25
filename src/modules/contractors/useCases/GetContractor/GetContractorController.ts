import {NextFunction, Request, Response} from "express";
import { GetContractorUseCase} from "./GetContractorUseCase";

export class GetContractorController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const { id } = request.params;
        const getContractorUseCase = new GetContractorUseCase();
        const result = await getContractorUseCase.execute(+id);

        return response.json(result);


    }
}