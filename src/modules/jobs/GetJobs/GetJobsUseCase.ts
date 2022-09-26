
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
                _sum: {
                    quarter: {
                        select: {
                            appointment: {
                                value: true,
                            }
                        },

                    }
                },
                client: {
                    select: {
                        name: true,
                        id: true, 
                    }
                },
                status: true,
                contractor: {
                    select: {
                        name: true,
                        id: true,
                    }
                },
                quarter: {
                    select: {
                        _sum : {
                            appointment: {
                                select: {
                                    value: true,
                                }
                            }
                        },
                        month: true,
                        year: true,
                        value_hour: true,
                        appointment: {
                            select: {
                                date: true,
                                value: true,
                            }
                        }
                    },
                    
                }
            }
        });


        return jobs;
    }
}