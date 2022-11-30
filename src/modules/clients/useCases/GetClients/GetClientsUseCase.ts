
import { prisma} from "../../../../database/prismaClient";
export class GetClientsUseCase {
    async execute() {

        const clients = await prisma.clients.findMany({
            orderBy: [{ name: 'asc'}],

            where: {
                status: 'ACTIVE',
            }
        });

        return clients;

    }
}