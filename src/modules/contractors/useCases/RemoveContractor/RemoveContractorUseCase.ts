
import { prisma} from "../../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError} from "../../../../middlewares/AppError";
export class RemoveContractorUseCase {
    async execute(id) {

        // Receber userName, password
        // Verificar se o userName cadastrado
        const contractorExist = await prisma.contractors.findFirst({
            where: {
                id
            }
        });

        if(!contractorExist) {
            throw new AppError("Contractor does not exists");
        }


        const client = await prisma.contractors.remove({
            where: {
                id,
            }
        });

        return client;
    }
}