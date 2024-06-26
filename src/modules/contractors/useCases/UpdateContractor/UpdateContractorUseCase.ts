import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IUpdateContractor {
    id: number;
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    identification: string;
    dob: Date;
    telephone: string;
    urlPrimaryResidencyProof: string,
    urlSecondaryResidencyProof: string,
    urlDocumentProof: string,
    urlProfile: string;
    ein?: string;
    address: string;
    city: string;
    zipcode: string;
    state: string;
}

interface ICreateContractorAddress {
    address: string;
    city: string;
    zipcode: string;
    state: string;
}


export class UpdateContractorUseCase {
    async execute(
        { id, first_name, middle_name, last_name, email, identification, ein, dob, telephone, urlPrimaryResidencyProof, urlSecondaryResidencyProof, urlDocumentProof, urlProfile, address, city, state, zipcode }: IUpdateContractor,
        //     { address, city, zipcode, state } : ICreateContractorAddress,
        //     { address2 = "", city2 = "", zipcode2 = "", state2 = "" } : ICreateContractorAddress | any
    ): Promise<any> {
        // const role = access == "" ? "CONTRACTOR" : access;
        //validar se o client existe
        const contractorExist = await prisma.contractors.findUnique({
            where: {
                id: +id
            }
        });


        if (!contractorExist) {
            throw new AppError('Contractor does not exists', 401)
        }


        const profile = urlProfile === '' ? contractorExist.urlProfile : urlProfile;
        const documentProof = urlDocumentProof === '' ? contractorExist.urlDocumentProof : urlDocumentProof;
        const primaryResidencyProof = urlPrimaryResidencyProof === '' ? contractorExist.urlPrimaryResidencyProof : urlPrimaryResidencyProof;
        //atualizar o contractor
        const contractor = await prisma.contractors.update({
            where: {
                id
            },
            data: {
                first_name,
                middle_name,
                last_name,
                email,
                ein,
                urlProfile: profile,
                urlDocumentProof: documentProof,
                urlPrimaryResidencyProof: primaryResidencyProof,
                urlSecondaryResidencyProof,
                identification,
                dob: new Date(dob),
                telephone,
            }
        });

        await prisma.adresseses.deleteMany({
            where: {
                fk_id_contractor: +id as number,

            }
        });

        await prisma.adresseses.create({
            data: {
                address,
                city,
                zipcode,
                state,
                fk_id_contractor: +id
            }
        });

        // const addr2 = (address2 != "") ? await prisma.adresseses.create({
        //     data: {
        //         address: address2,
        //         city: city2,
        //         zipcode: zipcode2,
        //         state: state2,
        //         fk_id_contractor: contractor.id
        //     }
        // }) : undefined;


        return contractor;
    }
}
