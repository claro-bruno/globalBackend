import {NextFunction, Request, Response} from "express";
import {UpdatePasswordAccountContractorUseCase} from "./UpdatePasswordAccountContractorUseCase";

export class UpdatePasswordAccountContractorController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const { id } = request.params;
        const { password  } = request.body;

        const updatePasswordAccountContractorUseCase = new UpdatePasswordAccountContractorUseCase();
        const result = await updatePasswordAccountContractorUseCase.execute({
            id: +id,
            idToken: +request.id,
            password
        });
        return response.json(result);

    }

}
