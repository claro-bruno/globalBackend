import {NextFunction, Request, Response} from "express";
import {UpdateContractorUseCase} from "./UpdateContractorUseCase";

export class UpdateContractorController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response>  {
        const { username, password, email, name, identification, address, birthday, telephone } = request.body;
            const createClientUseCase = new UpdateContractorUseCase();
            const result = await createClientUseCase.execute({
                username,
                password,
                email,
                name,
                identification,
                password,
                birthday,
                telephone
            });

            return response.json(result);


    }
}