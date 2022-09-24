import { NextFunction, Request, Response } from "express";
import { GetJobsByContractorUseCase } from "./GetJobsByContractorUseCase";

export class GetJobsByContractorController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const { id } = request.params;
        const { year, month } = request.body;
        const getJobsByContractorUseCase = new GetJobsByContractorUseCase();
        const result = await getJobsByContractorUseCase.execute(+id, +year, month);

        return response.json(result);


    }
}