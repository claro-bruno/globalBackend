import {NextFunction, Request, Response} from "express";
import {CreateClientContractorUseCase} from "./CreateClientContractorUseCase";


export class CreateClientContractorController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response>  {
        const { name, identification, phone, address, id_contractor  } = request.body;
        const createClientContractorUseCase = new CreateClientContractorUseCase();
        const result = await createClientContractorUseCase.execute({
            id_contractor,
            name,
            identification,
            phone,
            address
        });
        return response.json(result);
    }
}