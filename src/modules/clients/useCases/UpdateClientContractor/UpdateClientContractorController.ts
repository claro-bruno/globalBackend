import {NextFunction, Request, Response} from "express";
import {UpdateClientContractorUseCase} from "./UpdateClientContractorUseCase";


export class UpdateClientContractorController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response>  {
        const { id } = request.params;
        const { name, identification, phone, address  } = request.body;
        const updateClientContractorUseCase = new UpdateClientContractorUseCase();
    
        const result = await updateClientContractorUseCase.execute({
            id: +id,
            name,
            identification,
            phone,
            address
        });
        return response.json(result);
    }
}