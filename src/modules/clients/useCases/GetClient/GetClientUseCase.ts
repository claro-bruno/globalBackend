
import { prisma} from "../../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError} from "../../../../middlewares/AppError";
export class GetClientUseCase {
    async execute(id) {

        const client = await prisma.clients.findFirst({
            where: {
                id,
                status: true
            }
        });

        if(!client) {
            throw new AppError("Client does not exists");
        }



        return client;

    }
}