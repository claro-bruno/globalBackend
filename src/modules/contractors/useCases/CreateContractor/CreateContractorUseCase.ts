import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";
import { AppError} from "../../../../middlewares/AppError";

interface ICreateContractor {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    type: string;
    identification: string;
    ein: string;
    dob: Date;
    telephone: string;
    acceptTerms: boolean;
    urlPrimaryResidencyProf: string,
    urlSecondaryResidencyProf: string,
    urlDocumentProf: string,
    urlProfile: string;
}

interface ICreateContractorAddress {
    address: string;
    city: string;
    zipcode: string;
    state: string;
    country: string;
}

export class CreateContractorUseCase {
    async execute(
        { firstName, middleName, lastName, email, type, identification, ein, dob, telephone, acceptTerms, urlPrimaryResidencyProf, urlSecondaryResidencyProf, urlDocumentProf, urlProfile } : ICreateContractor,
        { address, city, zipcode, state, country } : ICreateContractorAddress,
        { address2 = "", city2 = "", zipcode2 = "", state2 = "", country2 = "" } : ICreateContractorAddress | any
    ): Promise<any>{
        //validar se o contractor existe
        const contractorExist = await prisma.contractors.findUnique({
           where: {
               email: email.toLowerCase(),
           }
        });

        if(contractorExist) {
            throw new AppError('Email already exists', 400)
        }

        const birthday = new Date(dob);
        const username = firstName[0].toLowerCase() + lastName + birthday.getFullYear().toString();
        const password = firstName.split(" ")[0].toString() + ("0" + (birthday.getMonth() + 1)).slice(-2).toString() + ("0" + (birthday.getDate())).slice(-2).toString();

        //criptografar a senha
        const hashPassword = await hash(password, 10);
        //salvar a contractor account

        const contractor_account = await prisma.accounts.create({
            data: {
                username,
                password: hashPassword,
                access: "CONTRACTOR",
                status: "INACTIVE"
            }
        });


        const contractor = await prisma.contractors.create({
            data: {
                first_name: firstName,
                middle_name: middleName,
                last_name: lastName,
                email,
                acceptTerms,
                ein,
                status: "PENDING",
                urlProfile,
                urlDocumentProf,
                urlPrimaryResidencyProf,
                urlSecondaryResidencyProf,
                type,
                identification,
                dob: birthday,
                telephone,
                fk_id_account: contractor_account.id
            }
        });

        const addr1 = await prisma.Adresseses.create({
            data: {
                address,
                city,
                zipcode,
                state,
                country,
                fk_id_contractor: contractor.id
            }
        });

        const addr2 = (address2 != "") ? await prisma.adresseses.create({
            data: {
                address2,
                city2,
                zipcode2,
                state2,
                country2,
                fk_id_contractor: contractor.id
            }
        }) : undefined;

        
        return { username, password };
    }

}