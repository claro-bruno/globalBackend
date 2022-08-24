
import { prisma } from "../../../database/prismaClient";
import { AppError } from "../../../middlewares/AppError";
export class CreateServicesUseCase {
    async execute(id) {

        // Receber userName, password
        // Verificar se o userName cadastrado
        const contractor = await prisma.contractors.findFirst({
            where: {
                id
            }
        });

        if(!contractor) {
            throw new AppError("Contractor does not exists");
        }


        return contractor;
    }
}