import {NextFunction, Request, Response} from "express";
import {ResetPasswordContractorUseCase} from "./ResetPasswordContractorUseCase";

export class ResetPasswordContractorController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const { email } = request.body;

        const resetPasswordContractorUseCase = new ResetPasswordContractorUseCase();
        const result = await resetPasswordContractorUseCase.execute({
            email
        });
        return response.json({ message: result });

    }

}
