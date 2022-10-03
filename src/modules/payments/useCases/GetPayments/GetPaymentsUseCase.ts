
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

export class GetPaymentsUseCase {
    async execute(year: number, month: string) {
        const jobs =  await prisma.jobs.findMany({
            orderBy: [{
                fk_id_contractor: 'asc'
            }],
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
                fk_id_contractor: true,
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
        const grouped = groupBy(jobs, (job: any) => job.fk_id_contractor);

        const payments: any = await prisma.$queryRaw`
            SELECT 
            DISTINCT jobs.fk_id_contractor,
            quarters.year,
            quarters.month,
            CONCAT(c.first_name, " ",c.middle_name, " ",c.last_name) AS name,
            (
				SELECT value AS value_1
                FROM payments as pa
                where pa.month = ${month} AND pa.year = ${year} AND pa.fk_id_contractor = c.id AND pa.quarter = 1
            ) AS value_1,
            (
				SELECT identification 
                FROM payments as pa
                where pa.month = ${month} AND pa.year = ${year} AND pa.fk_id_contractor = c.id AND pa.quarter = 1
            ) AS identification_1,
            (
				SELECT method 
                FROM payments as pa
                where pa.month = ${month} AND pa.year = ${year} AND pa.fk_id_contractor = c.id AND pa.quarter = 1
            ) AS method_1,
            (
				SELECT quarter 
                FROM payments as pa
                where pa.month = ${month} AND pa.year = ${year} AND pa.fk_id_contractor = c.id AND pa.quarter = 1
            ) AS quarter_1,
            (
				SELECT value 
                FROM payments as pa
                where pa.month = ${month} AND pa.year = ${year} AND pa.fk_id_contractor = c.id AND pa.quarter = 2
            ) AS value_2,
            (
				SELECT identification 
                FROM payments as pa
                where pa.month = ${month} AND pa.year = ${year} AND pa.fk_id_contractor = c.id AND pa.quarter = 2
            ) AS identification_2,
            (
				SELECT method 
                FROM payments as pa
                where pa.month = ${month} AND pa.year = ${year} AND pa.fk_id_contractor = c.id AND pa.quarter = 2
            ) AS method_2,
            (
				SELECT quarter 
                FROM payments as pa
                where pa.month = ${month} AND pa.year = ${year} AND pa.fk_id_contractor = c.id AND pa.quarter = 2
            ) AS quarter_2
            FROM jobs
            INNER JOIN quarters ON quarters.fk_id_job = jobs.id
            INNER JOIN contractors AS c ON jobs.fk_id_contractor = c.id
			WHERE quarters.month = ${month} AND quarters.year = ${year} 
            order by jobs.fk_id_contractor ASC
            ;`

        JSON.stringify(payments, (_, v) => typeof v === 'bigint' ? v.toString() : v);
        
        
        // console.log(grouped);
        // console.log(payments);
        

        payments.forEach((info: any) => {
            console.log(info);
            console.log(grouped.get(info.fk_id_contractor));
        });
        // payments.forEach((info: any, index: number)=> {
        //     let filtered: any = grouped.filter((info)=> {

        //     });
        //     console.log(info, grouped[0]);
        // });


        return jobs;
    }
}

function groupBy(list: any, keyGetter: any) {
    const map = new Map();
    list.forEach((item: any) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
}