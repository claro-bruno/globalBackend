
import { prisma } from "../../../database/prismaClient";
import { AppError } from "../../../middlewares/AppError";
function getMonthFromString(mon: string){

    var d = Date.parse(mon + "1, 2022");
    if(!isNaN(d)){
        return new Date(d).getMonth() + 1;
    }
    return -1;
}

export class GetJobsUseCase {
    async execute(year: number, month: string) {

        // Receber userName, password
        // Verificar se o userName cadastrado
        const jobs = await prisma.jobs.findMany({
            where: {
                status: true,
                quarters: {
                    month: +getMonthFromString(month),
                    year
                }
            },
            select: {
                id: true,
                clients: {
                    select: {
                        name: true,
                        id: true, 
                    }
                },
                status: true,
                contractors: {
                    select: {
                        name: true,
                        id: true,
                    }
                },
                quarters: {
                    select: {
                        month: true,
                        year: true,
                        value_hour: true,
                    },
                    appointments: {
                        value: true,
                    }
                }
            }
        });


        return jobs;
    }
}