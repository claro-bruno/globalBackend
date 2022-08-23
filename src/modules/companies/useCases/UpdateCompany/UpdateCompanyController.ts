import {NextFunction, Request, Response} from "express";
import {UpdateCompanyUseCase} from "./UpdateCompanyUseCase";

export class UpdateCompanyController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response>  {
        const { id } = request.params;
        const { name, rangeHour, monday, sunday, tuesday, wednesday, thuesday, friday, saturday, startHour, endHour, status  } = request.body;
        const updateCompanyUseCase = new UpdateCompanyUseCase();
        const result = await updateCompanyUseCase.execute({
            id,
            name,
            rangeHour,
            monday,
            sunday,
            tuesday,
            wednesday,
            thuesday,
            friday,
            saturday,
            startHour,
            endHour,
            status
        });
        return response.json(result);


    }
}