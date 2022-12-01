import {NextFunction, Request, Response} from "express";
import {CreateClientUseCase} from "./CreateClientUseCase";


export class CreateClientController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response>  {
        const { name, monday, sunday, tuesday, wednesday, thursday, friday, saturday, start, end, contact, contact_phone, address, email  } = request.body;
        const createClientUseCase = new CreateClientUseCase();
        const result = await createClientUseCase.execute({
            name,
            monday,
            sunday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            start,
            end,
            contact,
            contact_phone,
            address, 
            email
        });
        return response.json(result);
    }
}