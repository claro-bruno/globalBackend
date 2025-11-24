
import { prisma } from "../../../database/prismaClient";
import { AppError } from "../../../middlewares/AppError";
export class GetJobsByClientUseCase {
    async execute(id: number) {

        const jobs = await prisma.jobs.findMany({
            where: {
                fk_id_client: id,
                status: true
            }
        });


        return jobs;
    }
}