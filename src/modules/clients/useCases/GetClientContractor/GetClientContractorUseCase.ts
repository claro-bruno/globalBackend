
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";
export class GetClientContractorUseCase {
    async execute(id: number) {

        const client_contractor = await prisma.clientsContractors.findFirst({
            where: {
                id
            },
        });

        if (!client_contractor) {
            throw new AppError("Client Contractor does not exists");
        }



        return client_contractor;

    }
}