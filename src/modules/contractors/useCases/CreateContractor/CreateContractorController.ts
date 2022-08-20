import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import {CreateContractorUseCase} from "./CreateContractorUseCase";
dotenv.config();

declare module 'express-serve-static-core' {
    interface Request {
        files?: {
            primaryResidencyProf?: any;
            secondaryResidencyProf?: any;
            documentProf?: any;
            profile?: any;
        }
    }
}


export class CreateContractorController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response>  {
        let urlPrimaryResidencyProf= "";
        let urlSecondaryResidencyProf = "";
        let urlDocumentProf = "";
        let urlProfile = "";

        if (request.files) {
            const { primaryResidencyProf, secondaryResidencyProf, documentProf, profile } = request.files;
            urlPrimaryResidencyProf = primaryResidencyProf ? `${request.protocol}://${request.hostname}:${process.env.PORT}/src/${primaryResidencyProf[0].path}` : "";
            urlSecondaryResidencyProf = secondaryResidencyProf ? `${request.protocol}://${request.hostname}:${process.env.PORT}/src/${secondaryResidencyProf[0].path}` : "";
            urlDocumentProf = documentProf ? `${request.protocol}://${request.hostname}:${process.env.PORT}/src/${documentProf[0].path}` : "";
            urlProfile = profile ? `${request.protocol}://${request.hostname}:${process.env.PORT}/src/${profile[0].path}` : "";
        }
        const infoResult = JSON.parse(request.body.body);
        const { firstName, middleName ,lastName, email, type, identification, dob, telephone, acceptTerms, ein, primaryAddress, secondaryAddress = undefined } = infoResult;
        const { address, city, zipcode, state, country  } = primaryAddress;
        const { address2, city2, zipcode2, state2, country2 } = secondaryAddress;
        const adr2 = 'address2' in  secondaryAddress ? { address2, city2, zipcode2, state2, country2} : { address2: "", city2: "", zipcode2: "", state2: "", country2: "" };
        const createClientUseCase = new CreateContractorUseCase();
        const result = await createClientUseCase.execute({
             firstName,
             middleName,
             lastName,
             email,
             type,
             identification,
             dob,
             telephone,
             acceptTerms,
             ein,
             urlPrimaryResidencyProf,
             urlSecondaryResidencyProf,
             urlDocumentProf,
             urlProfile
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