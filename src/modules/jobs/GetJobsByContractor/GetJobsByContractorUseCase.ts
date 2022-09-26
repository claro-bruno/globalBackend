
import { prisma } from "../../../database/prismaClient";
import { AppError } from "../../../middlewares/AppError";

function getMonthFromString(mon: string){

    var d = Date.parse(mon + "1, 2022");
    if(!isNaN(d)){
        return new Date(d).getMonth() + 1;
    }
    return -1;
}

export class GetJobsByContractorUseCase {
    async execute(id: number, year: number, month: string) {


        const contractor = await prisma.jobs.findMany({
            where: {
                fk_id_contractor: id,
                status: true,
                quarters: {
                    month: +getMonthFromString(month),
                    year
                },
                select: {
                    id: true,
                    clients: {
                        name: true,
                        id: true, 
                    },
                    contractor: {
                        select: {
                            name: true,
                            id: true,
                        }
                    },
                    quarter: {
                        select: {
                            month: true,
                            year: true,
                            value_hour: true,
                        },
                        appointment: {
                            date: true,
                            value: true,
                        }
                    }
                }
            },

        });


        return contractor;
    }
}