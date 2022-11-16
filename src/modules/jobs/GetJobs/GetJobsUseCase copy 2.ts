import { prisma } from "../../../database/prismaClient";
import { AppError } from "../../../middlewares/AppError";

export class GetJobsUseCase__ {
    async execute(year: number, month: string) {
        let quarter: any = [];
        
        const jobs: any = await prisma.$queryRaw`
            SELECT 
            j.id,
            j.status,
            j.fk_id_contractor as contractor_id,
            CONCAT(c.first_name,' ',c.middle_name,' ',c.last_name) AS contractor_name,
            CONCAT(cl.name) AS client_name
            FROM jobs j
            INNER JOIN quarters q ON q.fk_id_job = j.id
            INNER JOIN contractors c ON c.id = j.fk_id_contractor
            INNER JOIN clients cl ON cl.id = j.fk_id_client
            WHERE  q.year = ${year} AND q.month = ${month}
            GROUP BY j.id,contractor_name,client_name,j.status
            ORDER BY j.id ASC
            ;`
        const result: any = await prisma.$queryRaw`
            SELECT 
            j.id, 
            j.status, 
            co.first_name, 
            co.middle_name, 
            co.last_name, 
            co.id as contractor_id,
            q.id as quarter_id,
            cl.name, 
            q.order, 
            q.month, 
            q.year, 
            q.value_hour, 
            q.status, 
            q.taxes, 
            q.shirts,
            ap.date,
            ap.value
            FROM appointments AS ap
            INNER JOIN quarters AS q ON ap.fk_id_quarter = q.id
            INNER JOIN jobs AS j ON j.id = q.fk_id_job
            INNER JOIN contractors AS co ON co.id = j.fk_id_contractor
            INNER JOIN clients AS cl ON cl.id = j.fk_id_client
            WHERE q.year = ${year} AND q.month = ${month}
            ORDER BY q.fk_id_job, q.id, ap.date
            ;`
        
        const result_totals: any = await prisma.$queryRaw`
            SELECT 
            q.fk_id_job as id,
            j.status,
			q.id AS quarter_id,
			q.order,
            CONCAT(c.first_name,' ',c.middle_name,' ',c.last_name) AS contractor_name,
            CONCAT(cl.name) AS client_name,
            sum(ap.value*q.value_hour) total,
            sum(ap.value) total_hours
            FROM jobs j
            INNER JOIN quarters q ON q.fk_id_job = j.id
            INNER JOIN appointments ap ON ap.fk_id_quarter = q.id
            INNER JOIN contractors c ON c.id = j.fk_id_contractor
            INNER JOIN clients cl ON cl.id = j.fk_id_client
            WHERE  q.year = ${year} AND q.month = ${month}
            GROUP BY q.id,contractor_name,client_name,j.status
            ORDER BY q.id ASC
            ;`

        
        const resultGrouped = groupBy(result, (job: any) => job.id);
        
        if(jobs.length > 0) {
            jobs.forEach((job: any) => {
                quarter = [];
                let job_info = resultGrouped.get(job.id);
                let quarterGrouped = groupBy(job_info, (quarter: any) => quarter.order);
                
                let first_quarter_info = quarterGrouped.get(1);
                if(first_quarter_info) {
                    const results = result_totals.find( (info: any) => info.quarter_id === first_quarter_info[0].quarter_id );
                    const first = {
                        total: results.total,
                        total_hours: results.total_hours,
                        order: first_quarter_info[0].order,
                        month: first_quarter_info[0].month,
                        year: first_quarter_info[0].year,
                        fk_id_quarter: first_quarter_info[0].quarter_id,
                        fk_id_job: first_quarter_info[0].id,
                        value_hour: first_quarter_info[0].value_hour,
                        status: first_quarter_info[0].status,
                        taxes: first_quarter_info[0].taxes,
                        shirts: first_quarter_info[0].shirts,
                        appointment: first_quarter_info
                    };
                    quarter.push(first);
                }
                let second_quarter_info = quarterGrouped.get(2);
                if(second_quarter_info) {
                    const results = result_totals.find( (info: any) => info.quarter_id === second_quarter_info[0].quarter_id );
                    const second = { 
                        total: results.total,
                        total_hours: results.total_hours,
                        order: second_quarter_info[0].order,
                        month: second_quarter_info[0].month,
                        year: second_quarter_info[0].year,
                        fk_id_job: second_quarter_info[0].id,
                        fk_id_quarter: first_quarter_info[0].quarter_id,
                        value_hour: second_quarter_info[0].value_hour,
                        status: second_quarter_info[0].status,
                        taxes: second_quarter_info[0].taxes,
                        shirts: second_quarter_info[0].shirts,
                        appointment: second_quarter_info
                    };
                    quarter.push(second);
                }
                job.quarter = quarter;
            });
        } else {
            return [];
        }
        
        

        
       
        

        
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