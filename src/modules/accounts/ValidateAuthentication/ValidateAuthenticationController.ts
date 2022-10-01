import {NextFunction, Request, Response} from "express";
import { ValidateAuthenticationUseCase } from "./ValidateAuthenticationUseCase";

export class ValidateAuthenticationController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const validateAuthenticationUseCase = new ValidateAuthenticationUseCase();
        const { access, contractor_id, account_id } = request;

        if(access && account_id) {
            validateAuthenticationUseCase.execute(+account_id, access as string)
            return response.json(access);
        }
        
    }
}