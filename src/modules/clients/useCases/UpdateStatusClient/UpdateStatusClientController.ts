import {NextFunction, Request, Response} from "express";
import {UpdateStatusClientUseCase} from "./UpdateStatusClientUseCase";

export class UpdateStatusClientController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response>  {
        const { id } = request.params;
        const { status  } = request.body;
        const updateClientUseCase = new UpdateStatusClientUseCase();
        const result = await updateClientUseCase.execute({
            id,
            status
        });
        return response.json(result);


    }
}