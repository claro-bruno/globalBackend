import {NextFunction, Request, Response} from "express";
import {UpdateClientUseCase} from "./UpdateClientUseCase";

export class UpdateClientController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response>  {
        const { id } = request.params;
        const { name, sunday, monday, tuesday, wednesday, thursday, friday, saturday, start, end, status, contact, contact_phone, address  } = request.body;
        const updateClientUseCase = new UpdateClientUseCase();
        const result = await updateClientUseCase.execute({
            id: +id,
            name,
            sunday,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            start,
            end,
            status,
            contact,
            contact_phone,
            address,            
        });
        return response.json(result);


    }
}