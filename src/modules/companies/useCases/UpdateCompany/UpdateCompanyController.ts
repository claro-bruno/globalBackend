import {NextFunction, Request, Response} from "express";
import {UpdateCompanyUseCase} from "./UpdateCompanyUseCase";

export class UpdateCompanyController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response>  {
        const { name } = request.body;
            const updateCompanyUseCase = new UpdateCompanyUseCase();
            const result = await updateCompanyUseCase.execute({
                name,
            });

            return response.json(result);


    }
}