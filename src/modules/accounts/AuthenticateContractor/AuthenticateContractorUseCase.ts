
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
        const client = await prisma.accounts.findFirst({
            where: {
                username
            }
        });

        if(!client) {
            throw new AppError("Username or Password invalid!");
        }
        // Verificar se a senha corresponde ao username
        const passwordMatch = await compare(password, client.password);

        if(!password) {
            throw new AppError("Username or Password invalid!");
        }
        // Gerar o token
        const token = sign({ username} , "7dfb4ababc7a6b6d9d57c737c2188402", { subject: client.id, expiresIn: "1d" });
        return token;
    }
}