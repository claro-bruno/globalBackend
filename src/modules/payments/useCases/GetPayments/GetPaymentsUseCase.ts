
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

export class GetPaymentsUseCase {
    async execute(year: number, month: string) {
        
        const result: any = await prisma.$queryRaw`
            SELECT 
            j.fk_id_contractor,
            CONCAT(c.first_name,' ',c.middle_name,' ',c.last_name) AS name,
            q.year,
            q.month,
            sum(case when q.order = 1 then ap.value*q.value_hour end) value_1,
            sum(case when q.order = 2 then ap.value*q.value_hour end) value_2,
            concat(case when p.quarter = 1 then p.identification end) identification_1,
            concat(case when p.quarter = 2 then p.identification end) identification_2,
            concat(case when p.quarter = 1 then p.method end) method_1,
            concat(case when p.quarter = 2 then p.method end) method_2,
            case when q.order = 1 then q.shirts+q.taxes end taxes_1, 
            case when q.order = 2 then q.shirts+q.taxes end taxes_2
            FROM jobs AS j
            INNER JOIN quarters AS q ON q.fk_id_job = j.id
            INNER JOIN appointments AS ap ON ap.fk_id_quarter = q.id
            INNER JOIN contractors AS c ON c.id = j.fk_id_contractor
            LEFT JOIN payments AS p ON p.fk_id_contractor = j.fk_id_contractor
            WHERE q.year = ${year} AND q.month = ${month} AND q.status = 'REVISED'
            GROUP BY j.fk_id_contractor,name,q.year,q.month,p.quarter,p.identification,p.method,q.order,ap.fk_id_quarter,q.id
            ORDER BY j.fk_id_contractor ASC
            ;`
        
        const result_totals: any = await prisma.$queryRaw`
            SELECT 
            sum(case when q.order = 1 then ap.value*q.value_hour end) total_1,
            sum(case when q.order = 2 then ap.value*q.value_hour end) total_2,
            sum(ap.value*q.value_hour) total

            FROM jobs j
            INNER JOIN quarters q ON q.fk_id_job = j.id
            INNER JOIN appointments ap ON ap.fk_id_quarter = q.id
            INNER JOIN contractors c ON c.id = j.fk_id_contractor
            WHERE q.year = ${year} AND q.month = ${month} AND q.status = 'REVISED'
            ;`
        
        let { total_1, total_2, total } = result_totals[0];
        total = total != null ? total : 0;
        total_1 = total_1 != null ? total_1 : 0;
        total_2 = total_2 != null ? total_2 : 0;

        return {payments:result, total:[{total},{total_1quarter:total_1},{total_2quarter:total_2}]};
        ;
    }
}