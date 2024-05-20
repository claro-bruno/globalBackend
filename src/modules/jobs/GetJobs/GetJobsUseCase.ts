import { prisma } from "../../../database/prismaClient";
import { AppError } from "../../../middlewares/AppError";

function getMonthFromString(mon: string) {

  var d = Date.parse(mon + "1, 2024");
  if (!isNaN(d)) {
    return new Date(d).getMonth() + 1;
  }
  return -1;
}

export class GetJobsUseCase {
  async execute(year: number, month: string) {
    const result: any = [];
    let arr: any = [];

    const isTotals = await prisma.totals.findFirst({
      where: {
        month,
        year

      }
    })
    let month_number = getMonthFromString(month)
    if (!isTotals) {
      const last_date = new Date(year, month_number, 0);
      for (let i = 1; i <= last_date.getDate(); i += 1) {
        arr.push({ day: i });
      }
      await arr.reduce(async (memo: any, info: any) => {
        await memo;
        await prisma.totals.create({
          data: {
            month,
            year: +year,
            day: info.day
          }
        });
      }, undefined);
    }




    const jobs_quarters: any = await prisma.quarters.findMany({
      orderBy: [
        {
          // fk_id_job: 'asc',
          // status: "asc",
          id: "asc",
          //

        },
        //{
        //   // fk_id_job: 'asc',
        //status: "asc",
        //   id: "asc",
        //   //

        //}
      ],
      where: {
        month,
        year: +year,
        OR: [
          {
            jobs: {
              status: 'ACTIVE',
            },
          },
          {
            jobs: { status: 'INACTIVE' }
          },
        ],
        // jobs: {
        //   status: 'ACTIVE',
        // }
      },
      select: {
        jobs:
        {
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
                type_pay: true,
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
    // jobs_quarters.sort(function (a: any, b: any) {
    //   if (a.status > b.status) {
    //     return 1;
    //   }
    //   if (a.status < b.status) {
    //     return -1;
    //   }
    //   // a must be equal to b
    //   return 0;
    // });

    const jobsGrouped = groupBy(
      jobs_quarters,
      (quarter: any) => quarter.fk_id_job
    );



    let result_total_days: any = await prisma.totals.findMany({
      orderBy: [{ day: 'asc' }],
      where: {
        month,
        year
      }
    });

    let totals_days: any = await prisma.$queryRaw`
      SELECT SUM(A.value) AS totalHour, extract(day from A.date) as dia from appointments A
      INNER JOIN quarters Q ON Q.id = A.fk_id_quarter
      INNER JOIN jobs J ON J.id = Q.fk_id_job
      WHERE q.month = ${month} AND q.year= ${year}
      GROUP BY extract(day from A.date)
      ORDER BY extract(day from A.date)
    `
    let tot: any = [];
    let dia: string = '';
    let dia_res: string = '';
    let mes: string = '';
    let mes_res: string = '';
    totals_days.forEach((day: any, index: number) => {
      mes_res = month_number.toString()
      mes = mes_res.length === 1 ? `0${month_number}` : mes_res
      dia_res = day.dia.toString()
      dia = dia_res.length === 1 ? `0${dia_res}` : dia_res
      if (tot.length === 0) {
        tot.push(day)
        tot[0].id = result_total_days[0]?.id
        tot[0].hour = result_total_days[0]?.valor
        tot[0].totalHour = day.totalhour
        tot[0].date = `${year}-${mes}-${dia}T00:00:00.000Z`
      }
      else {
        let indice = tot.length;
        if (indice > 0) {
          if (+tot[indice - 1].dia === +day.dia && +day.totalhour > +tot[indice - 1].totalhour) {
            tot.pop()
            tot.push(day)
            tot[+day.dia - 1].id = +result_total_days[+day.dia - 1]?.id
            tot[+day.dia - 1].hour = +result_total_days[+day.dia - 1]?.valor
            tot[+day.dia - 1].totalhour = +day.totalhour
            tot[+day.dia - 1].date = `${year}-${mes}-${dia}T00:00:00.000Z`

          }
          else if (+tot[indice - 1].dia !== +day.dia) {
            tot.push(day)

            tot[indice].id = +result_total_days[+day.dia - 1]?.id
            tot[indice].hour = +result_total_days[+day.dia - 1]?.valor
            tot[indice].totalhour = +day.totalhour
            tot[indice].date = `${year}-${mes}-${dia}T00:00:00.000Z`
          }

        }
      }

    })


    const result_totals: any = await prisma.$queryRaw`
            SELECT 
            q.fk_id_job as id,
            j.status,
            q.id AS quarter_id,
            q.order,
            CONCAT(c.first_name,' ',c.middle_name,' ',c.last_name) AS contractor_name,
            CONCAT(cl.name) AS client_name,
            ROUND(sum(ap.value*q.value_hour)::numeric, 2) total,
            sum(ap.value) total_hours
            FROM jobs j
            INNER JOIN quarters q ON q.fk_id_job = j.id
            INNER JOIN appointments ap ON ap.fk_id_quarter = q.id
            INNER JOIN contractors c ON c.id = j.fk_id_contractor
            INNER JOIN clients cl ON cl.id = j.fk_id_client
            WHERE  q.year = ${year} AND q.month = ${month}
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


      return { jobs: result, days: tot };
    } else {
      return [];
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
