
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";
export class GetClientsContractorUseCase {
    async execute() {
        return prisma.contractors.findMany({
            where: {
                NOT: {
                    fk_id_client_contractor: null
                }
            },
            include: {
                clientContractor: true,
            }
        });
    }
}