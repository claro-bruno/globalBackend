import {NextFunction, Request, Response} from "express";
import {UpdateContractorUseCase} from "./UpdateContractorUseCase";

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

export class UpdateContractorController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response>  {
        const updateContractorUseCase = new UpdateContractorUseCase();
        const { id } = request.params;
        let urlPrimaryResidencyProof= "";
        let urlSecondaryResidencyProof = "";
        let urlDocumentProof = "";
        let urlProfile = "";
    
        if (request.files) {
            const { primaryResidencyProof, secondaryResidencyProof, documentProof, profile } = request.files;
            urlPrimaryResidencyProof = primaryResidencyProof ? `${request.protocol}://${request.hostname}:${process.env.PORT}/src/${primaryResidencyProof[0].path}` : "";
            urlSecondaryResidencyProof = secondaryResidencyProof ? `${request.protocol}://${request.hostname}:${process.env.PORT}/src/${secondaryResidencyProof[0].path}` : "";
            urlDocumentProof = documentProof ? `${request.protocol}://${request.hostname}:${process.env.PORT}/src/${documentProof[0].path}` : "";
            urlProfile = profile ? `${request.protocol}://${request.hostname}:${process.env.PORT}/src/${profile[0].path}` : "";
        }
        // let adr2 = { address: "", city: "", zipcode: "", state: "" };
        const infoResult = JSON.parse(request.body.body);

        const { email, ssnOrItin, phone } = infoResult;
        // const einn = ein != undefined ? ein : "";
        const result = await updateContractorUseCase.execute({
            //  firstName,
            //  middleName,
            //  lastName,
            id: +id,
             email,
             identification: ssnOrItin,
            //  dob: birthDate,
             telephone: phone,
            //  acceptTerms,
            //  ein: einn,
             urlPrimaryResidencyProof,
            //  urlSecondaryResidencyProof,
             urlDocumentProof,
             urlProfile
        },
        );

        return response.json(result);


    }
}