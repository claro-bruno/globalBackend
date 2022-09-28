
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

        const jobs =  prisma.jobs.findMany({
            where: {
                status: 'ACTIVE',
                fk_id_contractor: +id,
                quarter: {
                    some: { 
                        year: {
                            equals: year,
                        },
                        month: {
                            equals: +getMonthFromString(month),
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

        // await prisma.jobs.groupBy({
        //     by: ['id'],
        //     where: {
        //         status: 'ACTIVE',
        //         quarter: {
        //             some: { 
        //                 year: {
        //                     equals: year,
        //                 },
        //                 month: {
        //                     equals: +getMonthFromString(month),
        //                 }
        //             }    
        //         }
        //     },
        
        //     _sum: {
                
        //     }
            
        // });

        // await prisma.jobs.aggregate({
        //     where: {
        //         status: 'ACTIVE',
        //         quarter: {
        //             some: { 
        //                 year: {
        //                     equals: year,
        //                 },
        //                 month: {
        //                     equals: +getMonthFromString(month),
        //                 }
        //             }    
        //         }
        //     },
            
        //     _sum: {

        //     }
            
        // });

        const res = await prisma.$queryRaw`
            SELECT sum(a.value) as total 
            FROM jobs as j
            INNER JOIN quarters as q ON q.fk_id_job = j.id
            INNER JOIN appointments as a ON a.fk_id_quarter = q.id
            WHERE 
            j.status = 'ACTIVE' AND 
            q.year = ${year} AND 
            q.month = ${+getMonthFromString(month)} AND
            j.fk_id_contractor = ${id}

            ;`
        
        const res2 = await prisma.$queryRaw`
            SELECT sum(a.value) as total 
            FROM jobs as j
            INNER JOIN quarters as q ON q.fk_id_job = j.id
            INNER JOIN appointments as a ON a.fk_id_quarter = q.id
            WHERE j.status = 'ACTIVE' AND q.year = ${year} AND q.month = ${+getMonthFromString(month)} AND
            j.fk_id_contractor = ${id}
            GROUP BY j.id
            ;`
        return res2;

    }
}