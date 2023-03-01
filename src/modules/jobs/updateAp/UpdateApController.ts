import { NextFunction, Request, Response } from "express";
import { UpdateApUseCase } from "./UpdateApUseCase";


export class UpdateApController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const { id, value  } = request.body;
        const updateApUseCase = new UpdateApUseCase();
        const result = await updateApUseCase.execute({
            id,
            value: +value
        });

        return response.json(result);


    }
}