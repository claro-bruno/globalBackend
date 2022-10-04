import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";
import { AppError} from "../../../../middlewares/AppError";

interface ICreateContractor {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    identification: string;
    ein?: string;
    dob: Date;
    telephone: string;
    acceptTerms: boolean;
    urlPrimaryResidencyProof: string,
    urlSecondaryResidencyProof: string,
    urlDocumentProof: string,
    urlProfile: string;
}

interface ICreateContractorAddress {
    address: string;
    city: string;
    zipcode: string;
    state: string;
}


export class UpdateContractorUseCase {
    async execute(
        { id, firstName, middleName, lastName, email, identification, ein, dob, telephone, acceptTerms, urlPrimaryResidencyProof, urlSecondaryResidencyProof, urlDocumentProof, urlProfile } : ICreateContractor,
        { address, city, zipcode, state } : ICreateContractorAddress,
        { address2 = "", city2 = "", zipcode2 = "", state2 = "" } : ICreateContractorAddress | any
    ): Promise<any>{
        //validar se o client existe
        const contractorExist = await prisma.contractors.findUnique({
           where: {
                id: +id
           }
        });

        if(!contractorExist) {
            throw new AppError('Contractor does not exists', 401)
        }

        //atualizar o contractor
        const contractor = await prisma.contractors.update({
            where: {
                id
            },
            data: {
                first_name: firstName,
                middle_name: middleName,
                last_name: lastName,
                email,
                acceptTerms,
                ein,
                status: "PENDING",
                urlProfile,
                urlDocumentProof,
                urlPrimaryResidencyProof,
                urlSecondaryResidencyProof,
                identification,
                dob,
                telephone,
            }
        });

        await prisma.adresseses.deleteMany({
            where: {
                fk_id_contractor: +id as number,

            }
        });

        const addr1 = await prisma.adresseses.create({
            data: {
                address,
                city,
                zipcode,
                state,
                fk_id_contractor: +id
            }
        });

        const addr2 = (address2 != "") ? await prisma.adresseses.create({
            data: {
                address: address2,
                city: city2,
                zipcode: zipcode2,
                state: state2,
                fk_id_contractor: contractor.id
            }
        }) : undefined;


        return contractor;
    }
}