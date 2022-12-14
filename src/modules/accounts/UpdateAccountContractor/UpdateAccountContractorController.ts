import {NextFunction, Request, Response} from "express";
import {UpdateAccountContractorUseCase} from "./UpdateAccountContractorUseCase";

export class UpdateAccountContractorController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const { id } = request.params;
        const { status, access } = request.body;

        const updateAccountContractorUseCase = new UpdateAccountContractorUseCase();
        const result = await updateAccountContractorUseCase.execute({
            id: +id,
            access,
            status
        });
        return response.json(result);

    }

}
