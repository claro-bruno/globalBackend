
import { prisma} from "../../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError} from "../../../../middlewares/AppError";
export class GetContractorsUseCase {
    async execute() {
        // Receber userName, password
        // Verificar se o userName cadastrado
        const contractors = await prisma.contractors.findMany();
        return contractors;
    }
}