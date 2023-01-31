import {NextFunction, Request, Response} from "express";
import {UpdateOrderUseCase} from "./UpdateOrderUseCase";


export class UpdateOrderController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response>  {
        const { date_at, description, notes, id_client, start, end, collaborators, support, email, contact, telephone, clientAddress, isInvoice, total_hours, event_type, invoice  } = request.body;
        const { id } = request.params;
        const updateOrderUseCase = new UpdateOrderUseCase();
        const result = await updateOrderUseCase.execute({
            id: +id,
            description,
            notes,
            id_client,
            start,
            end, 
            date_at,
            infos: collaborators, 
            support,
            email, 
            contact, 
            contact_phone: telephone, 
            address: clientAddress,
            isInvoice,
            total_hours, 
            type: event_type,
            invoice
        });
        return response.json(result);
    }
}
