import { prisma } from "../../../database/prismaClient";
import { AppError } from "../../../middlewares/AppError";

function getMonthFromString(mon: string) {
  var d = Date.parse(mon + "1, 2023");
  if (!isNaN(d)) {
    return new Date(d).getMonth() + 1;
  }
  return -1;
}

export class GetJobsUseCase_ {
  async execute(year: number, month: string) {
    const result: any = [];
    let arr: any = [];

    const isTotals = await prisma.totals.findFirst({ where: {
      month,
      year

    }})

    if (!isTotals) {
      const month_number = getMonthFromString(month)
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

    let result_total_days = await prisma.totals.findMany({
      orderBy: [{ day: 'asc' }],
      where: {
        month,
        year
      }
    });

    const jobs_quarters = await prisma.quarters.findMany({
      orderBy: [
        {
          // fk_id_job: 'asc',
          id: "asc"
        }
      ],
      where: {
        month,
        year: +year
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
        appointment: {
          select: {
            date: true,
            value: true
          }
        }
      }
    });

    const jobsGrouped = groupBy(
      jobs_quarters,
      (quarter: any) => quarter.fk_id_job
    );
    
    let totals_days: any = await prisma.$queryRaw`
      SELECT SUM(A.value) AS total, DATE_TRUNC ('day', A.date) AS date, extract(day from A.date) as dia from appointments A
      INNER JOIN quarters Q ON Q.id = A.fk_id_quarter
      INNER JOIN jobs J ON J.id = Q.fk_id_job
      WHERE q.month = ${month} AND q.year= ${year}
      GROUP BY extract(day from A.date), A.date
      ORDER BY extract(day from A.date)
    `
    let tot: any = [];
    totals_days.forEach((day: any, index: number) => {

      
      if(tot.length === 0) {
        tot.push(day)
      }
      else {
        let indice = tot.length;
        if(indice > 0) {

          if (+tot[indice-1].dia === +day.dia && +day.total > 0) {
            tot.pop()
            tot.push(day)
            
          }
          else if (+tot[indice-1].dia !== +day.dia) {
            tot.push(day)
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
        job_info.name = `${job[0].jobs.contractor.first_name} ${job[0].jobs.contractor.last_name}` ;
        // job_info.contractor_id = contractor_id;
        // job_info.client_name = name;
        // job_info.client_id = client_id;
        job_info.status = status;
        
        job.forEach((quarter: any) => {
          quarter.appointment.sort(function(a:any, b:any) { 
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


      return { jobs: result, totals_days: tot, totals: result_total_days };
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