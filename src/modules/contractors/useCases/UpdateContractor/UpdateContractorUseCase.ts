import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";
import { AppError} from "../../../../middlewares/AppError";

interface ICreateClient {
    username: string;
    password: string;
    email: string;
    name: string;
    role?: string;
    identification?: string;
    address?: string;
    birthday?: string;
    telephone?: string;
}


export class UpdateContractorUseCase {
    async execute({ username, password, email, name, identification, address,birthday, telephone } : ICreateClient): Promise<any>{
        //validar se o client existe
        const clientExist = await prisma.contractors.findUnique({
           where: {
               email: email.toLowerCase()
           }
        });

        if(!clientExist) {
            throw new AppError('Contractor does not exists', 401)
        }
        //criptografar a senha
        const hashPassword = await hash(password, 10);
        //salvar o client
        const client = await prisma.contractors.update({
            where: {
                username
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