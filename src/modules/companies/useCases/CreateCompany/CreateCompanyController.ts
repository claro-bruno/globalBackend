import {NextFunction, Request, Response} from "express";
import {CreateCompanyUseCase} from "./CreateCompanyUseCase";


export class CreateCompanyController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response>  {
        const { name, rangeHour, monday, sunday, tuesday, wednesday, thuesday, friday, saturday  } = request.body;
            const createCompanyUseCase = new CreateCompanyUseCase();
            const result = await createCompanyUseCase.execute({
                name,
                rangeHour,
                monday,
                sunday,
                tuesday,
                wednesday,
                thuesday,
                friday,
                saturday
            });

            return response.json(result);


    }
}