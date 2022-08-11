import {NextFunction, Request, Response} from "express";
import { AuthenticateContractorUseCase} from "./AuthenticateContractorUseCase";

export class AuthenticateContractorController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const { username, password } = request.body;
        const authenticateClientUseCase = new AuthenticateContractorUseCase();
        const result = await authenticateClientUseCase.execute({
            username,
            password
        });

        return response.json(result);


    }
}