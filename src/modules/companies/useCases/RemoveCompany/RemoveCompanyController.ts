import {NextFunction, Request, Response} from "express";
import { RemoveCompanyUseCase} from "./RemoveCompanyUseCase";

export class RemoveCompanyController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const { id } = request.params;
        const removeCompanyUseCase = new RemoveCompanyUseCase();
        const result = await removeCompanyUseCase.execute({
            id,
        });

        return response.json(result);


    }
}