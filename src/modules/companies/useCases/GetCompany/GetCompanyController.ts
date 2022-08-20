import {NextFunction, Request, Response} from "express";
import { GetCompanyUseCase} from "./GetCompanyUseCase";

export class GetCompanyController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const { id } = request.params;
        const getCompanyUseCase = new GetCompanyUseCase();
        const result = await getCompanyUseCase.execute({
            id,
        });

        return response.json(result);


    }
}