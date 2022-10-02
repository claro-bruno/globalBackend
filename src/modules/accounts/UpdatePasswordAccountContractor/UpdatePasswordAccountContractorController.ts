import {NextFunction, Request, Response} from "express";
import {UpdatePasswordAccountContractorUseCase} from "./UpdatePasswordAccountContractorUseCase";

export class UpdatePasswordAccountContractorController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const { id } = request.params;
        const { password  } = request.body;
        const { contractor_id, account_id } = request;

        const updatePasswordAccountContractorUseCase = new UpdatePasswordAccountContractorUseCase();
        const result = await updatePasswordAccountContractorUseCase.execute({
            account_id: +account_id,
            idToken: +contractor_id,
            password,
            id: +id
        });
        return response.json(result);

    }

}
