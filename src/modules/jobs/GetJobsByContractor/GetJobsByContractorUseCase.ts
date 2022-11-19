import { prisma } from "../../../database/prismaClient";
import { AppError } from "../../../middlewares/AppError";

function toJson(data: any) {
  if (data !== undefined) {
    return JSON.stringify(data, (_, v) =>
      typeof v === "bigint" ? `${v}#bigint` : v
    ).replace(/"(-?\d+)#bigint"/g, (_, a) => a);
  }
}

export class GetJobsByContractorUseCase {
  async execute(id: number, year: number, month: string) {
    // const result: any = [];
    let result: any = await prisma.$queryRaw`
            SELECT
            j.id,
            -- ap.id as id_ap,
            ap.date,
            ap.value,
            q.value_hour,            
            c.name,
            c.id,
            ap.fk_id_quarter,
            q.month
            FROM appointments ap
            INNER JOIN quarters q ON q.id = ap.fk_id_quarter
            INNER JOIN jobs j ON j.id = q.fk_id_job
            INNER JOIN clients c ON c.id = j.fk_id_client
            WHERE  q.year = ${year} AND q.month = ${month} AND j.fk_id_contractor = ${id} AND j.status = 'ACTIVE'
            ORDER BY j.id, ap.fk_id_quarter, ap.date ASC
            ;`;
    // result = toJson(result);
    // result = JSON.parse(result);
    // const result = await prisma.appointments.findMany({
    //     orderBy: [{
    //         // fk_id_job: 'asc',
    //         id: 'asc'

    //     }],
    //     where: {
    //         quarter: {
    //             month,
    //             year: +year,
    //             jobs: {
    //                 status: 'ACTIVE',
    //                 fk_id_contractor: +id,
    //             }
    //         },
    //     },
    //     select: {
    //         quarter: {
    //             select: {
    //                 jobs: {
    //                     select:
    //                     {
    //                         client: {
    //                             select: {
    //                                 name: true,
    //                                 id: true,
    //                             }
    //                         }
    //                     }
    //                 },
    //             }
    //         },
    //         date: true,
    //         value: true,
    //         fk_id_quarter: true
    //     }

    // });

    // const result_totals: any = await prisma.$queryRaw`
    //     SELECT
    //     q.fk_id_job as id,
    //     j.status,
    // 	q.id AS quarter_id,
    // 	q.order,
    //     CONCAT(c.first_name,' ',c.middle_name,' ',c.last_name) AS contractor_name,
    //     CONCAT(cl.name) AS client_name,
    //     sum(ap.value*q.value_hour) total,
    //     sum(ap.value) total_hours
    //     FROM jobs j
    //     INNER JOIN quarters q ON q.fk_id_job = j.id
    //     INNER JOIN appointments ap ON ap.fk_id_quarter = q.id
    //     INNER JOIN contractors c ON c.id = j.fk_id_contractor
    //     INNER JOIN clients cl ON cl.id = j.fk_id_client
    //     WHERE  q.year = ${year} AND q.month = ${month} AND j.fk_id_contractor = ${id} AND j.status = 'ACTIVE'
    //     GROUP BY q.id,contractor_name,client_name,j.status
    //     ORDER BY q.id ASC
    //     ;`

    const results_total: any = await prisma.$queryRaw`
            SELECT 
            sum(ap.value*q.value_hour) total,
            sum(ap.value) total_hours,
            sum(case when q.order = 1 then ap.value*q.value_hour end) total_1,
            sum(case when q.order = 1 then ap.value end) total_hours_1,
            sum(case when q.order = 1 then q.others end) total_taxes_1,
            sum(case when q.order = 2 then ap.value*q.value_hour end) total_2,
            sum(case when q.order = 2 then ap.value end) total_hours_2,
            sum(case when q.order = 2 then q.others end) total_taxes_2,
            FROM jobs j
            INNER JOIN quarters q ON q.fk_id_job = j.id
            INNER JOIN appointments ap ON ap.fk_id_quarter = q.id
            INNER JOIN contractors c ON c.id = j.fk_id_contractor
            WHERE q.year = ${year} AND q.month = ${month} AND j.fk_id_contractor = ${id} AND j.status = 'ACTIVE'
            ;`;

    const {
      total,
      total_hours,
      total_1,
      total_2,
      total_hours_1,
      total_hours_2,
      total_taxes_1,
      total_taxes_2
    } = results_total[0];

    // const jobsGrouped = groupBy(jobs_quarters, (quarter: any) => quarter.fk_id_job);

    if (result.length > 0) {
      //     jobsGrouped.forEach((job: any) => {
      //         const job_info: any = {};

      //         const {
      //             id,
      //             status
      //             // client: { name, id: client_id },
      //             // contractor: { first_name, middle_name, last_name , id: contractor_id }
      //         } = job[0].jobs;
      //         job_info.id = id;
      //         job_info.contractor = job[0].jobs.contractor;
      //         job_info.client = job[0].jobs.client;
      //         // job_info.contractor_name = middle_name != undefined ? `${first_name} ${middle_name} ${last_name}` : `${first_name} ${last_name}` ;
      //         // job_info.contractor_id = contractor_id;
      //         // job_info.client_name = name;
      //         // job_info.client_id = client_id;
      //         job_info.status = status;

      //         job.forEach((quarter: any) => {
      //             const totals = result_totals.find( (info: any) => info.quarter_id === quarter.id );
      //             quarter.total = totals.total;
      //             quarter.total_hours = totals.total_hours;
      //         });

      //         job_info.quarter = job;
      //         result.push(job_info);
      //     });

      return {
        contractor_jobs: result,
        totals: [
          { total: total, total_hours: total_hours },
          {
            total_1hours: total_hours_1,
            total_1quarter: total_1,
            total_taxes1quarter: total_taxes_1
          },
          {
            total_2hours: total_hours_2,
            total_2quarter: total_2,
            total_taxes2quarter: total_taxes_2
          }
        ]
      };
    } else {
      return {
        contractor_jobs: [],
        totals: [
          { total: 0, total_hours: 0 },
          { total_1hours: 0, total_1quarter: 0, total_taxes1quarter: 0 },
          { total_2hours: 0, total_2quarter: 0, total_taxes2quarter: 0 }
        ]
      };
    }
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
