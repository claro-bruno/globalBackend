import {NextFunction, Request, Response} from "express";
import { RemoveClientUseCase} from "./RemoveClientUseCase";

export class RemoveClientController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const { id } = request.params;
        const removeClientUseCase = new RemoveClientUseCase();
        const result = await removeClientUseCase.execute({
            id,
        });

        return response.json(result);


    }
}