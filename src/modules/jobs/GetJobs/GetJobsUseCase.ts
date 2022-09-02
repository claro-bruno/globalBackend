
import { prisma } from "../../../database/prismaClient";
import { AppError } from "../../../middlewares/AppError";
export class GetJobsUseCase {
    async execute() {

        // Receber userName, password
        // Verificar se o userName cadastrado
        const jobs = await prisma.jobs.findMany({
            where: {
                status: true
            }
        });


        return jobs;
    }
}