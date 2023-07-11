import {NextFunction, Request, Response} from "express";
import {CreateOrderUseCase} from "./CreateOrderUseCase";


export class CreateOrderController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response>  {
        const { date_at,date_at_end,description, notes, id_client, start, end, collaborators, support, email, contact, telephone, clientAddress, total_hours, event_type  } = request.body;
        const createOrderUseCase = new CreateOrderUseCase();
        const result = await createOrderUseCase.execute({
            description,
            notes,
            type: event_type,
            id_client,
            start,
            end, 
            date_at,
            date_at_end,
            support,
            email, 
            contact, 
            contact_phone: telephone, 
            address: clientAddress,
            total_hours: +total_hours,
            infos: collaborators,
        });
        return response.json(result);
    }
}

/*
    description: string;
    notes?: string;
    id_client: number;
    start: string;
    end: string;
    date_at: string;
    date_at_end: string;
    support?: string;
    collaborators?: string;
    email: string; 
    contact: string;
    contact_phone: string;
    address: string;
    total_hours?: number;
    type: string;
    infos: any;
*/