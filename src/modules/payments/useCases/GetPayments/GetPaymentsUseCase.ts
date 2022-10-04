
import { AnyARecord } from "dns";
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

        let payments: any = await prisma.$queryRaw`
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
             ) AS method_2
            FROM jobs
            INNER JOIN quarters ON quarters.fk_id_job = jobs.id
            INNER JOIN contractors AS c ON jobs.fk_id_contractor = c.id
			WHERE quarters.month = ${month} AND quarters.year = ${year} 
            order by jobs.fk_id_contractor ASC
            ;`
        
        // JSON.stringify(payments, (_, v) => typeof v === 'bigint' ? v.toString() : v);
        
        const result: any = [];
        let payy: any = [];
        let total = 0;
        let pays: any = {};
        let total_1quarter = 0;
        let total_2quarter = 0;
        let total_1 = 0;
        let total_2 = 0;
        let total_hours = 0;
        let obj: any = {};
        payments.forEach((info: any) => {
            obj = {};
            payy = [];
            pays = {};
            total_1quarter = 0;
            total_2quarter = 0;
            obj.fk_id_contractor = info.fk_id_contractor;
            obj.year = info.year;
            obj.month = info.month;
            obj.name = info.name;
            
            pays.value = info.value_1;
            pays.identifier = info.identification_1;
            pays.method = info.method_1;
            pays.quarter = 1;

            payy.push(pays);
            
            pays = {};
            pays.value = info.value_2;
            pays.identifier = info.identification_2;
            pays.method = info.method_2;
            pays.quarter = 2;
            payy.push(pays);
            obj.payments = payy;

            let map_info = grouped.get(info.fk_id_contractor);

            map_info.forEach((job: any) => {
                job.quarter.forEach((quarter: any)=>{
                    total_hours = 0;
                    quarter.appointment.forEach((appointment: any) =>{
                        total_hours += appointment.value;
                        
                    });
                    if(quarter.order === 1) {
                        total_1quarter += total_hours * quarter.value_hour;
                        total_1 += total_hours * quarter.value_hour;
                    }
                        
                    if(quarter.order === 2) {
                        total_2quarter += total_hours * quarter.value_hour;
                        total_2 += total_hours * quarter.value_hour;
                    }
                    
                    total += total_hours * quarter.value_hour;
                });
                obj.total = total_1quarter + total_2quarter;
                obj.total_1quarter = total_1quarter;
                obj.total_2quarter = total_2quarter;

            });
            result.push(obj);
        });

        // console.log(payments);
        // return payments;
        return {payments:result, total:[{total},{total_1quarter:total_1},{total_2quarter:total_2}]};
        ;
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