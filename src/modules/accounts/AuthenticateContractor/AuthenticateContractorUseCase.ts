
import { prisma} from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError} from "../../../middlewares/AppError";

interface IAuthenticateClient {
     username: string;
     password: string;
}

export class AuthenticateContractorUseCase {
    async execute({ username, password }: IAuthenticateClient) {

        // Receber userName, password
        // Verificar se o userName cadastrado
        const contractor_account = await prisma.accounts.findFirst({
            where: {
                username,
                status: 'INACTIVE'
            },
            select: {
                access: true,
                password: true,
                contractor: true,
            }
        });

        if(!contractor_account) {
            throw new AppError("Username or Password invalid!");
        }
        // Verificar se a senha corresponde ao username
        const passwordMatch = await compare(password, contractor_account.password);

        if(!password) {
            throw new AppError("Username or Password invalid!");
        }

        const { access, contractor } = contractor_account;
        const { id: id_contractor } = contractor;
        // Gerar o token
        const token = sign({ access, id_contractor } , "7dfb4ababc7a6b6d9d57c737c2188402", { expiresIn: "1d" });
        //retornar a role da permissão de acesso.
        return { token, access };
    }
}