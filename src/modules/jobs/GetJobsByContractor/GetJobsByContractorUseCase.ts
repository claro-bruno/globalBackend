
import { prisma } from "../../../database/prismaClient";
import { AppError } from "../../../middlewares/AppError";
export class GetJobsByContractorUseCase {
    async execute(id: number) {
        const contractor = await prisma.jobs.findMany({
            where: {
                fk_id_contractor: id,
                status: true
            }
        });


        return contractor;
    }
}