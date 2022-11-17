import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

function getMonthFromString(mon: string, year: number) {
  var d = Date.parse(mon + "1, " + year);
  if (!isNaN(d)) {
    return new Date(d).getMonth();
  }
  return -1;
}

function toMonthName(monthNumber: number) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString("en-US", {
    month: "long"
  });
}

export class GetPaymentsUseCase {
  async execute(year: number, month: string) {
    // const lastMonth = month == 'January' ? 'December' : toMonthName(getMonthFromString(month, year));
    // const lastYear = month == 'January' ? year - 1 : year;

    // const balanceLastMonthExist = await prisma.balances.findFirst({
    //     where: {
    //         month: lastMonth,
    //         year: lastYear
    //     }
    // });

    // const balanceExist = await prisma.balances.findFirst({
    //     where: {
    //         month,
    //         year            }
    // });

    // if(balanceLastMonthExist && !balanceExist) {
    //     await prisma.balances.create({
    //         data: {
    //             year,
    //             month,
    //             value: balanceLastMonthExist.value
    //         }
    //     });
    // }

    const activeJobs = await prisma.jobs.findMany({
      orderBy: [
        {
          id: "asc"
        }
      ],
      // where: {
      //     status: 'ACTIVE',
      // },
      select: {
        id: true,
        fk_id_contractor: true,
        client: {
          select: {
            name: true,
            id: true
          }
        },
        status: true,
        contractor: {
          select: {
            first_name: true,
            middle_name: true,
            last_name: true,
            id: true
          }
        }
      }
    });

    const activeQuarters = await prisma.quarters.findMany({
      orderBy: [
        {
          id: "asc"
        }
      ],
      where: {
        month,
        year: +year,
        status: "REVISED"
        // jobs: {
        //     status: 'ACTIVE'
        // }
      },
      select: {
        fk_id_job: true,
        order: true,
        month: true,
        year: true,
        value_hour: true,
        taxes: true,
        shirts: true,
        appointment: {
          select: {
            date: true,
            value: true
          }
        }
      }
    });

    const quartersGrouped = groupBy(
      activeQuarters,
      (quarter: any) => quarter.fk_id_job
    );

    activeJobs.forEach((job: any) => {
      let quarter_info = quartersGrouped.get(job.id);
      job.quarter = quarter_info;
    });
    // let jobs =  await prisma.jobs.findMany({
    //     orderBy: [{
    //         fk_id_contractor: 'asc'
    //     }],
    //     where: {
    //         status: 'ACTIVE',
    //         quarter: {
    //             some: {
    //                 year: {
    //                     equals: +year,
    //                 },
    //                 month: {
    //                     equals: month,
    //                 }
    //             }
    //         }
    //     },
    //     select: {
    //         id: true,
    //         fk_id_contractor: true,
    //         client: {

    //             select:
    //             {
    //                 name: true,
    //                 id: true,
    //             }
    //         },
    //         status: true,
    //         contractor: {
    //             select: {
    //                 first_name: true,
    //                 middle_name: true,
    //                 last_name: true,
    //                 id: true,
    //             }
    //         },
    //         quarter: {
    //             select: {
    //                 order: true,
    //                 month: true,
    //                 year: true,
    //                 value_hour: true,
    //                 appointment:
    //                 {
    //                     select:
    //                     {
    //                         date: true,
    //                         value: true,
    //                     }
    //                 }
    //             },

    //         }
    //     }
    // });

    // jobs.forEach((job: any) => {
    //     let result = job.quarter.filter((quarter: any) => {
    //         return quarter.month == month && quarter.year == year;
    //     });
    //     job.quarter = result;
    // });

    let grouped = groupBy(activeJobs, (job: any) => job.fk_id_contractor);

    let payments: any = await prisma.$queryRaw`
            SELECT 
            DISTINCT jobs.fk_id_contractor,
            quarters.year,
            quarters.month,
            CONCAT(c.first_name,' ',c.middle_name,' ',c.last_name) AS name,
            (
				SELECT value AS value_1
                FROM payments as pa
                where pa.month = ${month} AND pa.year = ${year} AND pa.fk_id_contractor = c.id AND pa.quarter = 1 AND pa.type = 'CONTRACTOR_WORKERS'
            ) AS value_1,
            (
				SELECT identification 
                FROM payments as pa
                where pa.month = ${month} AND pa.year = ${year} AND pa.fk_id_contractor = c.id AND pa.quarter = 1 AND pa.type = 'CONTRACTOR_WORKERS'
            ) AS identification_1,
            (
				SELECT method 
                FROM payments as pa
                where pa.month = ${month} AND pa.year = ${year} AND pa.fk_id_contractor = c.id AND pa.quarter = 1 AND pa.type = 'CONTRACTOR_WORKERS'
            ) AS method_1,
            (
				SELECT value 
                FROM payments as pa
                where pa.month = ${month} AND pa.year = ${year} AND pa.fk_id_contractor = c.id AND pa.quarter = 2 AND pa.type = 'CONTRACTOR_WORKERS'
            ) AS value_2,
            (
				SELECT identification 
                FROM payments as pa
                where pa.month = ${month} AND pa.year = ${year} AND pa.fk_id_contractor = c.id AND pa.quarter = 2 AND pa.type = 'CONTRACTOR_WORKERS'
            ) AS identification_2,
            (
				SELECT method 
                FROM payments as pa
                where pa.month = ${month} AND pa.year = ${year} AND pa.fk_id_contractor = c.id AND pa.quarter = 2 AND pa.type = 'CONTRACTOR_WORKERS'
             ) AS method_2
            FROM jobs
            INNER JOIN quarters ON quarters.fk_id_job = jobs.id
            INNER JOIN contractors AS c ON jobs.fk_id_contractor = c.id
			WHERE quarters.month = ${month} AND quarters.year = ${year}
            order by jobs.fk_id_contractor ASC
            ;`;

    const result: any = [];
    let payy: any = [];
    let total = 0;
    let pays: any = {};
    let total_1quarter = 0;
    let total_2quarter = 0;
    let total_1 = 0;
    let total_2 = 0;
    let total_hours = 0;
    let total_taxes = 0;
    let total_shirts = 0;
    let total_taxes_1 = 0;
    let total_shirts_1 = 0;
    let total_taxes_2 = 0;
    let total_shirts_2 = 0;
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
      total_taxes_1 = 0;
      total_shirts_1 = 0;
      total_taxes_2 = 0;
      total_shirts_2 = 0;
      total_taxes = 0;
      total_shirts = 0;

      let map_info = grouped.get(info.fk_id_contractor);
      map_info.forEach((job: any) => {
        if (job.quarter != undefined) {
          job.quarter.forEach((quarter: any) => {
            let total_hours = quarter.appointment.reduce(
              (acc: number, curr: any) => (acc += curr.value),
              0
            );
            if (quarter.order === 1) {
              total_1quarter += total_hours * quarter.value_hour;
              total_1 += total_hours * quarter.value_hour;
              total_taxes_1 += quarter.taxes;
              total_shirts_1 += quarter.shirts;
            }

            if (quarter.order === 2) {
              total_2quarter += total_hours * quarter.value_hour;
              total_2 += total_hours * quarter.value_hour;
              total_taxes_2 += quarter.taxes;
              total_shirts_2 += quarter.shirts;
            }
            total_taxes += quarter.taxes;
            total_shirts += quarter.shirts;
            total += total_hours * quarter.value_hour;
          });
        }

        // obj.total = total_1quarter + total_2quarter;
        // obj.total_1quarter = total_1quarter;
        // obj.total_2quarter = total_2quarter;
      });

      pays.value = total_1quarter;
      pays.identifier = info.identification_1;
      pays.method = info.method_1;
      pays.taxes_job = total_taxes_1;
      pays.shirts_job = total_shirts_1;
      pays.quarter = 1;

      payy.push(pays);

      pays = {};
      pays.value = total_2quarter;
      pays.identifier = info.identification_2;
      pays.method = info.method_2;
      pays.quarter = 2;
      pays.taxes_job = total_taxes_2;
      pays.shirts_job = total_shirts_2;
      payy.push(pays);
      obj.taxes = total_taxes;
      obj.shirts = total_shirts;
      obj.payments = payy;

      result.push(obj);
    });

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
