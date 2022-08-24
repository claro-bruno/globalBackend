import { NextFunction, Request, Response } from "express";
import { CreateServicesUseCase } from "./CreateServicesUseCase";


export class CreateServicesController {
    async handle(request: Request, response: Response, next: NextFunction)  {
        const { id_client, sunday, monday, tuesday, wednesday, thursday, friday, saturday, value, month, year, quarter  } = request.body;
        const createServicesUseCase = new CreateServicesUseCase();
        const result = await createServicesUseCase.execute({
            id_contractor: request.id,
            id_client,
            sunday,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            value,
            year,
            month,
            quarter_option: quarter
        });

        return response.json(result);


    }
}