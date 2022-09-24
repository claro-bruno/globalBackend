import {NextFunction, Request, Response} from "express";

export class ValidateAuthenticationController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const { access } = request;
        return response.json(access);
    }
}