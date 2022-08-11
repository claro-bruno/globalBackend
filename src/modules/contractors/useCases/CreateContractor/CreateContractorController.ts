import {NextFunction, Request, Response} from "express";
import {CreateContractorUseCase} from "./CreateContractorUseCase";



export class CreateContractorController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response>  {
        const { firstName, lastName, email, type, identification, dob, telephone } = request.body;
        const { address, city, zipcode, state, country } = request.body.address;
        const { address2, city2, zipcode2, state2, country2 } = request.body.address2;
        const adr2 = address2 ? { address2, city2, zipcode2, state2, country2 } : undefined;
        const createClientUseCase = new CreateContractorUseCase();
        const result = await createClientUseCase.execute({
             firstName,
             lastName,
             email,
             type,
             identification,
             dob,
             telephone
        },
        {
            address,
            city,
            zipcode,
            state,
            country
        },
            adr2
        );

        return response.json(result);


    }
}