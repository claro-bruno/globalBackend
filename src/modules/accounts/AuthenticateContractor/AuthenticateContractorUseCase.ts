
import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../middlewares/AppError";

import { getFileContent } from "../../../helpers/getFileContent";

const secret = getFileContent('jwt.evaluation.key');


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
                status: 'ACTIVE'
            },
            select: {
                id: true,
                access: true,
                password: true,
                contractor: true,
                resetPassword: true,

            }
        });

        if (!contractor_account) {
            throw new AppError("Username or Password invalid!");
        }
        // Verificar se a senha corresponde ao username
        const passwordMatch = await compare(password, contractor_account.password);

        if (!passwordMatch) {
            throw new AppError("Username or Password invalid!");
        }

        const { access, contractor, resetPassword, id: account_id } = contractor_account;
        const { id: contractor_id } = contractor as any;
        // Gerar o token
        const token = sign({ access, contractor_id: +contractor_id, account_id: +account_id }, secret, { expiresIn: "365d" });
        //retornar a role da permissão de acesso.
        return { token, access, contractor_id, reset: resetPassword, account_id };
    }
}