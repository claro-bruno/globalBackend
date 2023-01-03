import {NextFunction, Request, Response} from "express";
import {UpdateActiveClientContractorUseCase} from "./UpdateActiveClientContractorUseCase";


export class UpdateActiveClientContractorController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response>  {
        const { contrator_id, client_contractor_id  } = request.body;
        const updateActiveClientContractorUseCase = new UpdateActiveClientContractorUseCase();
    
        const result = await updateActiveClientContractorUseCase.execute({
            contrator_id: +contrator_id,
            client_contractor_id: +client_contractor_id,
        });
        return response.json(result);
    }
}