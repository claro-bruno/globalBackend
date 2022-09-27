
import { prisma} from "../../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError} from "../../../../middlewares/AppError";
export class GetClientsUseCase {
    async execute() {

        const clients = await prisma.clients.findMany({
            where: {
                status: 'ACTIVE',
            }
        });

        return clients;

    }
}