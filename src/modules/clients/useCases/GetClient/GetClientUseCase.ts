
import { prisma } from "../../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../../middlewares/AppError";
export class GetClientUseCase {
    async execute(id: number) {

        const client = await prisma.clients.findFirst({
            where: {
                id,
                status: 'ACTIVE'
            },
        });

        if (!client) {
            throw new AppError("Client does not exists");
        }



        return client;

    }
}