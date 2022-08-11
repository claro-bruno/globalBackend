import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";
import { AppError} from "../../../../middlewares/AppError";

interface IUpdateCompany {
    name: string;
}


export class UpdateCompanyUseCase {
    async execute({ name } : IUpdateCompany): Promise<any>{
        //validar se o client existe
        const companyExist = await prisma.contractors.findUnique({
           where: {
               name: name.toLowerCase()
           }
        });

        if(!companyExist) {
            throw new AppError('Company does not exists', 401)
        }
        //criptografar a senha
        const hashPassword = await hash(password, 10);
        //salvar o client
        const client = await prisma.contractors.update({
            where: {
                id
            },
            data: {
                username,
                password: hashPassword,
                email,
                name,
                identification,
                address,
                birthday,
                telephone,

            }
        });
        return client;
    }
}