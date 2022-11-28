import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import {CreateContractorUseCase} from "./CreateContractorUseCase";
dotenv.config();

declare module 'express-serve-static-core' {
    interface Request {
        files?: {
            primaryResidencyProof?: any;
            secondaryResidencyProof?: any;
            documentProof?: any;
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
            const { primaryResidencyProof, secondaryResidencyProof, documentProof, profile } = request.files;
            urlPrimaryResidencyProof = primaryResidencyProof ? `${request.protocol}://${request.hostname}:${process.env.PORT}/images/${primaryResidencyProof[0].filename}` : "";
            urlSecondaryResidencyProof = secondaryResidencyProof ?  `${request.protocol}://${request.hostname}:${process.env.PORT}/images/${secondaryResidencyProof[0].filename}` : "";
            urlDocumentProof = documentProof ? `${request.protocol}://${request.hostname}:${process.env.PORT}/images/${documentProof[0].filename}` : "";
            urlProfile = profile ? `${request.protocol}://${request.hostname}:${process.env.PORT}/images/${profile[0].filename}` : "";
        }
        let adr2 = { address: "", city: "", zipcode: "", state: "" };
        const infoResult = JSON.parse(request.body.body);
        const { access = "CONTRACTOR", firstName, middleName ,lastName, email, ssnOrItin, birthDate, phone, acceptTerms, ein = undefined, primaryAddress, secondaryAddress = undefined } = infoResult;
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
             urlProfile,
             access
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