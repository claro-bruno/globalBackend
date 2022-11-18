import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

export class GetPaymentsUseCase {
  async execute(year: number, month: string) {
    const result: any = await prisma.$queryRaw`
            SELECT
            DISTINCT c.id as fk_id_contractor,
            CONCAT(c.first_name,' ',c.middle_name,' ',c.last_name) AS name,
            q.year,
            q.month,
           sum(case when q.order = 1 then ap.value*q.value_hour end) AS value_1,
           sum(case when q.order = 2 then ap.value*q.value_hour end) AS value_2,
            (
				SELECT
				SUM(quarters.shirts+quarters.taxes) FROM jobs
				INNER JOIN quarters ON quarters.fk_id_job = jobs.id
				WHERE quarters.order = 1 AND jobs.fk_id_contractor = c.id
			) AS  taxes_1,
			(
				SELECT
				SUM(quarters.shirts+quarters.taxes) FROM jobs
				INNER JOIN quarters ON quarters.fk_id_job = jobs.id
				WHERE quarters.order = 2 AND jobs.fk_id_contractor = c.id
			) AS  taxes_2
            FROM jobs AS j
            INNER JOIN quarters AS q ON q.fk_id_job = j.id
            INNER JOIN appointments AS ap ON ap.fk_id_quarter = q.id
            INNER JOIN contractors AS c ON c.id = j.fk_id_contractor
            WHERE q.year = ${year} AND q.month = ${month} AND q.status = 'REVISED'
            GROUP BY c.id,q.year,q.month,name,q.status
            ORDER BY c.id ASC
            ;`;

    const payments: any = await prisma.$queryRaw`
    SELECT 
            DISTINCT jobs.fk_id_contractor,
            (
				SELECT value AS value_1
                FROM payments as pa
                where pa.fk_id_contractor = c.id AND pa.quarter = 1 AND pa.type = 'CONTRACTOR_WORKERS'
            ) AS value_1,
            (
				SELECT identification 
                FROM payments as pa
                where pa.fk_id_contractor = c.id AND pa.quarter = 1 AND pa.type = 'CONTRACTOR_WORKERS'
            ) AS identification_1,
            (
				SELECT method 
                FROM payments as pa
                where pa.fk_id_contractor = c.id AND pa.quarter = 1 AND pa.type = 'CONTRACTOR_WORKERS'
            ) AS method_1,
            (
				SELECT value 
                FROM payments as pa
                where pa.fk_id_contractor = c.id AND pa.quarter = 2 AND pa.type = 'CONTRACTOR_WORKERS'
            ) AS value_2,
            (
				SELECT identification 
                FROM payments as pa
                where pa.fk_id_contractor = c.id AND pa.quarter = 2 AND pa.type = 'CONTRACTOR_WORKERS'
            ) AS identification_2,
            (
				SELECT method 
                FROM payments as pa
                where pa.fk_id_contractor = c.id AND pa.quarter = 2 AND pa.type = 'CONTRACTOR_WORKERS'
             ) AS method_2
            FROM jobs
            INNER JOIN quarters ON quarters.fk_id_job = jobs.id
            INNER JOIN contractors AS c ON jobs.fk_id_contractor = c.id
			WHERE quarters.month = 'November' AND quarters.year = 2022
            order by jobs.fk_id_contractor ASC
    ;`;

    result.forEach((payment: any, index: number) => {
      const pay = payments.find(
        (info: any) => info.fk_id_contractor === payment.fk_id_contractor
      );
      if (pay) {
        payment.identification_1 = pay.identification_1;
        payment.identification_2 = pay.identification_2;
        payment.method_1 = pay.method_1;
        payment.method_2 = pay.method_2;
      }
    });

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
            ;`;

    let { total_1, total_2, total } = result_totals[0];
    total = total != null ? total : 0;
    total_1 = total_1 != null ? total_1 : 0;
    total_2 = total_2 != null ? total_2 : 0;

    return {
      payments: result,
      total: [
        { total },
        { total_1quarter: total_1 },
        { total_2quarter: total_2 }
      ]
    };
  }
}
