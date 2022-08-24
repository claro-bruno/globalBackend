import {NextFunction, Request, Response} from "express";
import {UpdateClientUseCase} from "./UpdateClientUseCase";

export class UpdateClientController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response>  {
        const { id } = request.params;
        const { name, rangeHour, monday, sunday, tuesday, wednesday, thursday, friday, saturday, startHour, endHour, status  } = request.body;
        const updateClientUseCase = new UpdateClientUseCase();
        const result = await updateClientUseCase.execute({
            id,
            name,
            rangeHour,
            monday,
            sunday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            startHour,
            endHour,
            status
        });
        return response.json(result);


    }
}