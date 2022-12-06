import {NextFunction, Request, Response} from "express";
import {CreateOrderUseCase} from "./CreateOrderUseCase";


export class CreateOrderController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response>  {
        const { date_at, description, notes, id_client, start, end, collaborators, support, email, contact, telephone, clientAddress  } = request.body;
        const createOrderUseCase = new CreateOrderUseCase();
        const result = await createOrderUseCase.execute({
            description,
            notes,
            id_client,
            start,
            end, 
            date_at,
            collaborators, 
            support,
            email, 
            contact, 
            contact_phone: telephone, 
            address: clientAddress
        });
        return response.json(result);
    }
}