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
    const result: any = [];
    let arr: any = [];

    const jobs_quarters = await prisma.quarters.findMany({
      orderBy: [
        {
          // fk_id_job: 'asc',
          id: "asc"
        }
      ],
      where: {
        month,
        year: +year,
        // status: 'REVISED',
        jobs: {
          fk_id_contractor: +id,
          // status: 'ACTIVE',
        }

      },
      select: {
        jobs: {
          select: {
            status: true,
            id: true,
            sunday: true,
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: true,
            start: true,
            end: true,
            client: {
              select: {
                name: true,
                id: true
              }
            },
            contractor: {
              select: {
                first_name: true,
                middle_name: true,
                last_name: true,
                id: true
              }
            }
          }
        },
        fk_id_job: true,
        id: true,
        order: true,
        month: true,
        year: true,
        value_hour: true,
        status: true,
        others: true,
        appointment: true,
      }
    });


    const jobsGrouped = groupBy(
      jobs_quarters,
      (quarter: any) => quarter.fk_id_job
    );

    let totals_days: any = await prisma.$queryRaw`
      SELECT SUM(A.value) AS totalHour, extract(day from A.date) as dia, A.date from appointments A
      INNER JOIN quarters Q ON Q.id = A.fk_id_quarter
      INNER JOIN jobs J ON J.id = Q.fk_id_job
      WHERE q.month = ${month} AND q.year= ${year} AND J.fk_id_contractor= ${id}
      GROUP BY extract(day from A.date), A.date 
      ORDER BY extract(day from A.date)
    `


    // let result: any = await prisma.$queryRaw`
    //         SELECT
    //         j.id,
    //         -- ap.id as id_ap,
    //         ap.date,
    //         ap.value,
    //         q.value_hour,            
    //         c.name,
    //         c.id,
    //         ap.fk_id_quarter,
    //         q.month,
    //         q.others,
    //         j.sunday,
    //         j.monday,
    //         j.tuesday,
    //         j.wednesday,
    //         j.thursday,
    //         j.friday,
    //         j.saturday,
    //         j.start,
    //         j.end
    //         FROM appointments ap
    //         INNER JOIN quarters q ON q.id = ap.fk_id_quarter
    //         INNER JOIN jobs j ON j.id = q.fk_id_job
    //         INNER JOIN clients c ON c.id = j.fk_id_client
    //         WHERE  q.year = ${year} AND q.month = ${month} AND j.fk_id_contractor = ${id} AND j.status = 'ACTIVE'
    //         ORDER BY j.id, ap.fk_id_quarter, ap.date ASC
    //         ;`;
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
      --       ( 
			-- 	SELECT sum(appointments.value*quarters.value_hour) FROM appointments
			-- 	INNER JOIN quarters ON quarters.id = appointments.fk_id_quarter
			-- 	WHERE quarters.order = 1
			-- ) AS total_1,
      -- ( 
			-- 	SELECT sum(appointments.value*quarters.value_hour) FROM appointments
			-- 	INNER JOIN quarters ON quarters.id = appointments.fk_id_quarter
			-- 	WHERE quarters.order = 2
			-- ) AS total_2,
      -- ( 
			-- 	SELECT sum(appointments.value) FROM appointments
			-- 	INNER JOIN quarters ON quarters.id = appointments.fk_id_quarter
			-- 	WHERE quarters.order = 1
			-- ) AS total_hours_1,
      -- ( 
			-- 	SELECT sum(appointments.value) FROM appointments
			-- 	INNER JOIN quarters ON quarters.id = appointments.fk_id_quarter
			-- 	WHERE quarters.order = 2
			-- ) AS total_hours_2,
            -- sum(case when q.order = 1 then ap.value*q.value_hour end) total_1,
            -- sum(case when q.order = 1 then ap.value end) total_hours_1,
			( 
				SELECT sum(quarters.others) FROM jobs
				INNER JOIN quarters ON quarters.fk_id_job = jobs.id
				WHERE quarters.order = 1 AND jobs.fk_id_contractor = ${id} AND quarters.year = ${year} AND quarters.month = ${month} 
			) AS total_others_1,
				( 
				SELECT sum(quarters.others) FROM jobs
				INNER JOIN quarters ON quarters.fk_id_job = jobs.id
				WHERE quarters.order = 2 AND jobs.fk_id_contractor = ${id} AND quarters.year = ${year} AND quarters.month = ${month} 
			) AS total_others_2,
				( 
				SELECT sum(quarters.others) FROM jobs
				INNER JOIN quarters ON quarters.fk_id_job = jobs.id
        WHERE jobs.fk_id_contractor = ${id} AND quarters.year = ${year} AND quarters.month = ${month}
			) AS total_others

            FROM jobs j
            INNER JOIN quarters q ON q.fk_id_job = j.id
            INNER JOIN appointments ap ON ap.fk_id_quarter = q.id
            INNER JOIN contractors c ON c.id = j.fk_id_contractor
            WHERE q.year = ${year} AND q.month = ${month} AND j.fk_id_contractor = ${id} AND q.status = 'REVISED'
            ;`;


    const results_total_quarter: any = await prisma.$queryRaw`
          SELECT
            sum(ap.value*q.value_hour) as total,
            sum(ap.value) as total_hours,
            q.order as quarter

          FROM jobs j
          INNER JOIN quarters q ON q.fk_id_job = j.id
          INNER JOIN appointments ap ON ap.fk_id_quarter = q.id
          WHERE q.year = ${year} AND q.month = ${month} AND j.fk_id_contractor = ${id} AND q.status = 'REVISED'
          GROUP BY q.order
          
    ;`;
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
            WHERE  q.year = ${year} AND q.month = ${month} AND j.fk_id_contractor= ${id}
            GROUP BY q.id,contractor_name,client_name,j.status
            ORDER BY q.id ASC
            ;`;

    if (jobs_quarters.length > 0) {

      jobsGrouped.forEach((job: any) => {
        const job_info: any = {};

        const {
          id,
          status
          // client: { name, id: client_id },
          // contractor: { first_name, last_name , id: contractor_id }
        } = job[0].jobs;
        job_info.id = id;
        job_info.contractor = job[0].jobs.contractor;
        job_info.client = job[0].jobs.client;
        job_info.name = `${job[0].jobs.contractor.first_name} ${job[0].jobs.contractor.last_name}`;
        // job_info.contractor_id = contractor_id;
        // job_info.client_name = name;
        // job_info.client_id = client_id;
        job_info.status = status;

        job.forEach((quarter: any) => {
          quarter.appointment.forEach((ap: any) => {
            ap.id = ap.id.toString().split('n')[0] !== '' ? Number(ap.id.toString().split('n')[0]) : ap.id
          })
          quarter.appointment.sort(function (a: any, b: any) {
            return a.date.getTime() - b.date.getTime()
          });
          const totals = result_totals.find(
            (info: any) => info.quarter_id === quarter.id
          );
          quarter.total = totals.total;
          quarter.total_hours = totals.total_hours;
        });

        job_info.quarter = job;

        result.push(job_info);
      });

      result.sort(function (a: any, b: any) {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      result.sort(function (a: any, b: any) {
        if (a.status > b.status) {
          return 1;
        }
        if (a.status < b.status) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      const {
        total,
        total_hours,
        total_others,
        total_others_1,
        total_others_2
      } = results_total[0];

      const total_1 = results_total_quarter[0]?.quarter === 1 ? results_total_quarter[0]?.total : 0
      const total_2 = results_total_quarter[0]?.quarter === 2 ? results_total_quarter[0]?.total : results_total_quarter[1]?.quarter === 2 ? results_total_quarter[1]?.total : 0
      const total_hours_1 = results_total_quarter[0]?.quarter === 1 ? results_total_quarter[0]?.total_hours : 0
      const total_hours_2 = results_total_quarter[0]?.quarter === 2 ? results_total_quarter[0]?.total_hours : results_total_quarter[1]?.quarter === 2 ? results_total_quarter[1]?.total_hours : 0



      return {
        jobs: result, days: totals_days, totals: {
          total: total,
          total_hours: total_hours,
          total_payment: total - total_others,
          total_1_hours: total_hours_1,
          total_1_quarter: total_1,
          total_1_others: total_others_1,
          total_1_payment: total_1 - total_others_1,
          total_2_hours: total_hours_2,
          total_2_quarter: total_2,
          total_2_others: total_others_2,
          total_2_payment: total_2 - total_others_2
        }
      };
    } else {
      return [];
    }
  }
}






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
