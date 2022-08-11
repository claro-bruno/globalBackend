import {NextFunction, Request, Response} from "express";
import { RemoveContractorUseCase} from "./RemoveContractorUseCase";

export class RemoveContractorController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const { id } = request.params;
        const removeContractorUseCase = new RemoveContractorUseCase();
        const result = await removeContractorUseCase.execute({
            id,
        });

        return response.json(result);


    }
}