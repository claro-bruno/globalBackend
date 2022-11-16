import {NextFunction, Request, Response} from "express";
import {UpdateContractorUseCase} from "./UpdateContractorUseCase";

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


export class UpdateContractorController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response>  {
        const updateContractorUseCase = new UpdateContractorUseCase();
        const { id } = request.params;
        

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
        // let adr2 = { address: "", city: "", zipcode: "", state: "" };
        // console.log(request.body);
        const infoResult = JSON.parse(request.body.body);
        
        const { first_name, middle_name ,last_name, email, identification, dob, telephone, ein, address, city, state, zipcode } = infoResult;
        // const { address, city, zipcode, state  } = primaryAddress;
        // if (secondaryAddress != undefined ) {
        //     const { address: address2, city: city2, zipcode: zipcode2, state:state2  } = secondaryAddress;
        //     adr2 = { address: address2, city: city2, zipcode: zipcode2, state: state2};

        // }
        // const einn = ein != undefined ? ein : "";
        const result = await updateContractorUseCase.execute({
             id: +id,
             first_name,
             middle_name,
             last_name,
             email,
             identification,
             dob,
             telephone,
             ein,
             urlPrimaryResidencyProof,
             urlSecondaryResidencyProof,
             urlDocumentProof,
             urlProfile,
             address,
             city,
             zipcode,
             state
        }
       
        );

        return response.json(result);


    }
}