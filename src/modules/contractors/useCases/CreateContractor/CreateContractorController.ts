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
        let urlPrimaryResidencyProof= "";
        let urlSecondaryResidencyProof = "";
        let urlDocumentProof = "";
        let urlProfile = "";

        if (request.files) {
            const { primaryResidencyProf, secondaryResidencyProf, documentProf, profile } = request.files;
            urlPrimaryResidencyProof = primaryResidencyProf ? `${request.protocol}://${request.hostname}:${process.env.PORT}/images/${primaryResidencyProf[0].filename}` : "";
            urlSecondaryResidencyProof = secondaryResidencyProf ?  `${request.protocol}://${request.hostname}:${process.env.PORT}/images/${secondaryResidencyProf[0].filename}` : "";
            urlDocumentProof = documentProf ? `${request.protocol}://${request.hostname}:${process.env.PORT}/images/${documentProf[0].filename}` : "";
            urlProfile = profile ? `${request.protocol}://${request.hostname}:${process.env.PORT}/images/${profile[0].filename}` : "";
        }
        let adr2 = { address: "", city: "", zipcode: "", state: "" };
        const infoResult = JSON.parse(request.body.body);
        const { firstName, middleName ,lastName, email, ssnOrItin, birthDate, phone, acceptTerms, ein = undefined, primaryAddress, secondaryAddress = undefined } = infoResult;
        const { address, city, zipcode, state  } = primaryAddress;
        if (secondaryAddress != undefined ) {
            const { address: address2, city: city2, zipcode: zipcode2, state:state2  } = secondaryAddress;
            adr2 = { address: address2, city: city2, zipcode: zipcode2, state: state2};

        }
        const einn = ein != undefined ? ein : "";
        const createClientUseCase = new CreateContractorUseCase();
        const result = await createClientUseCase.execute({
             firstName,
             middleName,
             lastName,
             email,
             identification: ssnOrItin,
             dob: birthDate,
             telephone: phone,
             acceptTerms,
             ein: einn,
             urlPrimaryResidencyProof,
             urlSecondaryResidencyProof,
             urlDocumentProof,
             urlProfile
        },
        {
            address,
            city,
            zipcode,
            state
        },
            adr2
        );

        return response.json(result);


    }
}