
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

export class GetPaymentsUseCase {
    async execute(year: number, month: string) {
        const jobs =  await prisma.jobs.findMany({
            distinct: ['fk_id_contractor'],
            where: {
                status: 'ACTIVE',
                quarter: {
                    some: { 
                        year: {
                            equals: +year,
                        },
                        month: {
                            equals: month,
                        }
                    }    
                }
            },
            select: {
                
                id: true,
                client: {
                    
                    select: 
                    {
                        name: true,
                        id: true, 
                    }
                },
                status: true,
                contractor: {
                    select: {
                        first_name: true,
                        middle_name: true,
                        last_name: true,
                        id: true,
                     }
                },
                quarter: {
                    select: {
                        order: true,
                        month: true,
                        year: true,
                        value_hour: true,
                        appointment: 
                        {
                            select: 
                            {
                                date: true,
                                value: true,
                            }
                        }
                    },
                    
                }
            }
        });
        // const payments = await prisma.$queryRaw`
        //     SELECT 
            //     p.year,
            //     p.month,
            //     p.identification,
            //     p.value,
            //     p.quarter
        //     FROM contractors AS c
        //     INNER JOIN payments as p ON p.fk_id_contractor = c.id
        //     RIGHT JOIN jobs as j ON j.fk_id_contractor = c.id
        //     WHERE p.month = 'October' AND p.year = 2022
        //     ;`

    


        return jobs;
    }
}