import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";
import {hash} from "bcrypt";

interface ICompany {
    name: string;
    rangeHour: string;
    sunday: boolean;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thuesday: boolean;
    friday: boolean;
    saturday: boolean;
}

export class CreateCompanyUseCase {
    async execute({ name, rangeHour, monday, sunday, tuesday, wednesday, thuesday, friday, saturday } : ICompany): Promise<any>{
        //validar se o client existe
        const companyExist = await prisma.contractors.findUnique({
           where: {
               name: name.toLowerCase()
           }
        });

        if(companyExist) {
            throw new AppError('Company already exists', 422)
        }

        const password = "global" + name.split(" ").join().toString() + new Date().getFullYear().toString()

        //criptografar a senha
        const hashPassword = await hash(password, 10);


        const company_account = await prisma.accounts.create({
            data: {
                username: name,
                password: hashPassword,
                access: "COMPANY",
                status: "ACTIVE"
            }
        });

        //salvar a company
        const company = await prisma.companies.create({
            data: {
                name,
                rangeHour,
                monday,
                sunday,
                tuesday,
                wednesday,
                thuesday,
                friday,
                saturday,
                fk_id_account: company_account.id,
            }
        });
        return company;
    }
}