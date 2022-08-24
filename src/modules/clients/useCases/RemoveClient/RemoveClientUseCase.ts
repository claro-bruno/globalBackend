
import { prisma} from "../../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError} from "../../../../middlewares/AppError";
export class RemoveClientUseCase {
    async execute(id) {

        const clientExist = await prisma.clients.findFirst({
            where: {
                id
            }
        });

        if(!clientExist) {
            throw new AppError("Client does not exists");
        }


        const client = await prisma.clients.remove({
            where: {
                id,
            }
        });

        return client;

    }
}