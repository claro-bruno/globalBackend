import { NextFunction, Request, Response } from "express";
import { GetJobsByContractorUseCase } from "./GetJobsByContractorUseCase";

export class GetJobsByContractorController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const { id } = request.params;
        const { year, month } = request.query;
        const getJobsByContractorUseCase = new GetJobsByContractorUseCase();
        if(id && year && month) {
            const result = await getJobsByContractorUseCase.execute(+id, +year, month as string);
            return response.json(result);
        }

    }
}