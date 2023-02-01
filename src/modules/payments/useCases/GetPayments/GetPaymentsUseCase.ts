import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

export class GetPaymentsUseCase {
  async execute(year: number, month: string) {
    const result: any = await prisma.$queryRaw`
        SELECT
            DISTINCT c.id as fk_id_contractor,
            c.first_name,
            CONCAT(c.first_name,' ',c.middle_name,' ',c.last_name) AS name,
            q.year,
            q.month,
           sum(case when q.order = 1 then ap.value*q.value_hour end) AS value_1,
           sum(case when q.order = 2 then ap.value*q.value_hour end) AS value_2,
            (
				SELECT
				SUM(quarters.others) FROM jobs
				INNER JOIN quarters ON quarters.fk_id_job = jobs.id
				WHERE quarters.order = 1 AND jobs.fk_id_contractor = c.id
			) AS others_1,
			(
				SELECT
				SUM(quarters.others) FROM jobs
				INNER JOIN quarters ON quarters.fk_id_job = jobs.id
				WHERE quarters.order = 2 AND jobs.fk_id_contractor = c.id
			) AS others_2
            FROM jobs AS j
            INNER JOIN quarters AS q ON q.fk_id_job = j.id
            INNER JOIN appointments AS ap ON ap.fk_id_quarter = q.id
            INNER JOIN contractors AS c ON c.id = j.fk_id_contractor
            WHERE q.year = ${year} AND q.month = ${month} AND q.status = 'REVISED'
            GROUP BY c.id,q.year,q.month,name,q.status
            ORDER BY c.first_name ASC
            ;`;

    
    const payments: any = await prisma.$queryRaw`
    SELECT 
            DISTINCT jobs.fk_id_contractor,
            (
              SELECT id AS id_1
                FROM "paymentsContractors" as pa
                where pa.fk_id_contractor = c.id AND pa.quarter = 1 AND pa.type = 'CONTRACTOR_WORKERS'
             
            )AS id_1,
            (
        
				SELECT value AS value_1
                FROM "paymentsContractors" as pa
                where pa.fk_id_contractor = c.id AND pa.quarter = 1 AND pa.type = 'CONTRACTOR_WORKERS'
            ) AS value_1,
            (
				SELECT others AS value_1
                FROM "paymentsContractors" as pa
                where pa.fk_id_contractor = c.id AND pa.quarter = 1 AND pa.type = 'CONTRACTOR_WORKERS'
            ) AS others_1,
            (
				SELECT identification 
                FROM "paymentsContractors" as pa
                where pa.fk_id_contractor = c.id AND pa.quarter = 1 AND pa.type = 'CONTRACTOR_WORKERS'
            ) AS identification_1,
            (
				SELECT description 
                FROM "paymentsContractors" as pa
                where pa.fk_id_contractor = c.id AND pa.quarter = 1 AND pa.type = 'CONTRACTOR_WORKERS'
            ) AS description_1,
            (
				SELECT method 
                FROM "paymentsContractors" as pa
                where pa.fk_id_contractor = c.id AND pa.quarter = 1 AND pa.type = 'CONTRACTOR_WORKERS'
            ) AS method_1,
            (
              SELECT id AS id_2
                FROM "paymentsContractors" as pa
                where pa.fk_id_contractor = c.id AND pa.quarter = 2 AND pa.type = 'CONTRACTOR_WORKERS'
            )AS id_2,
            (
				SELECT value 
                FROM "paymentsContractors" as pa
                where pa.fk_id_contractor = c.id AND pa.quarter = 2 AND pa.type = 'CONTRACTOR_WORKERS'
            ) AS value_2,
            (
				SELECT others
                FROM "paymentsContractors" as pa
                where pa.fk_id_contractor = c.id AND pa.quarter = 2 AND pa.type = 'CONTRACTOR_WORKERS'
            ) AS others_2,
            (
				SELECT identification 
                FROM "paymentsContractors" as pa
                where pa.fk_id_contractor = c.id AND pa.quarter = 2 AND pa.type = 'CONTRACTOR_WORKERS'
            ) AS identification_2,
            (
				SELECT description 
                FROM "paymentsContractors" as pa
                where pa.fk_id_contractor = c.id AND pa.quarter = 2 AND pa.type = 'CONTRACTOR_WORKERS'
            ) AS description_2,
            (
				SELECT method 
                FROM "paymentsContractors" as pa
                where pa.fk_id_contractor = c.id AND pa.quarter = 2 AND pa.type = 'CONTRACTOR_WORKERS'
             ) AS method_2
            FROM jobs
            INNER JOIN quarters ON quarters.fk_id_job = jobs.id
            INNER JOIN contractors AS c ON jobs.fk_id_contractor = c.id
			WHERE quarters.month = ${month} AND quarters.year = ${year}
            order by jobs.fk_id_contractor ASC
    ;`;

    result.forEach((payment: any, index: number) => {
      const pay = payments.find(
        (info: any) => info.fk_id_contractor === payment.fk_id_contractor
      );
      if (pay) {
        payment.id_1 = pay.id_1 != null ? pay.id_1 : '';
        payment.id_2 = pay.id_1 != null ? pay.id_2 : '';
        payment.identification_1 = pay.identification_1;
        payment.identification_2 = pay.identification_2;
        payment.description_1 = pay.description_1;
        payment.description_2 = pay.description_2;
        payment.others_1 = payment.others_1;
        payment.others_2 = payment.others_2;
        payment.method_1 = pay.method_1;
        payment.method_2 = pay.method_2;
        payment.total_1_payment = payment.value_1 - payment.others_1;
        payment.total_2_payment = payment.value_2 - payment.others_2;
        payment.total_month = payment.total_1_payment + payment.total_2_payment;
      }
    });

    const result_totals: any = await prisma.$queryRaw`
            SELECT 
            sum(case when q.order = 1 and q.month = ${month} and q.year = ${year} then ap.value*q.value_hour end) total_1,
            sum(case when q.order = 2 and q.month = ${month} and q.year = ${year} then ap.value*q.value_hour end) total_2,
            ( 
              SELECT sum(quarters.others) FROM jobs
              INNER JOIN quarters ON quarters.fk_id_job = jobs.id
              WHERE quarters.order = 1 and quarters.month = ${month} and quarters.year = ${year} AND quarters.status = 'REVISED'
            ) AS total_others_1,
              ( 
              SELECT sum(quarters.others) FROM jobs
              INNER JOIN quarters ON quarters.fk_id_job = jobs.id
              WHERE quarters.order = 2 and quarters.month = ${month} and quarters.year = ${year} AND quarters.status = 'REVISED'
            ) AS total_others_2
            FROM jobs j
            INNER JOIN quarters q ON q.fk_id_job = j.id
            INNER JOIN appointments ap ON ap.fk_id_quarter = q.id
            INNER JOIN contractors c ON c.id = j.fk_id_contractor
            WHERE q.year = ${year} AND q.month = ${month} AND q.status = 'REVISED'
            ;`;
    
    // const result_totals_others: any = await prisma.$queryRaw`
    //         SELECT 
    //         sum(case when q.order = 1 then q.others end) total_others_1,
		// 	      sum(case when q.order = 2 then q.others end) total_others_2

    //         FROM jobs j
    //         INNER JOIN quarters q ON q.fk_id_job = j.id
    //         WHERE q.year = ${year} AND q.month = ${month} AND q.status = 'REVISED'
    //         ;`;

    let { total_1, total_2, total_others_1, total_others_2 } = result_totals[0];
    // let { total_others_1, total_others_2 } = result_totals_others[0];
    total_1 = total_1 != null ? total_1 : 0;
    total_others_1 = total_others_1 != null ? total_others_1 : 0;
    total_2 = total_2 != null ? total_2 : 0;
    total_others_2 = total_others_2 != null ? total_others_2 : 0;

    return {
      payments: result,
      total: {
        total_1_quarter: total_1,
        total_2_quarter: total_2,
        total: total_1 + total_2,
        total_1_others: total_others_1,
        total_2_others: total_others_2,
        total_1_payment: total_1 - total_others_1,
        total_2_payment: total_2 - total_others_2,
        total_month_payment: (total_1 - total_others_1) + (total_2 - total_others_2)
      } 
    };
  }
}
