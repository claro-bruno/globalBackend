
import { prisma } from "../../../database/prismaClient";
import { AppError } from "../../../middlewares/AppError";

function getMonthFromString(mon: string){

    const d = Date.parse(mon + "1, 2022");
    if(!isNaN(d)){
        return new Date(d).getMonth() + 1;
    }
    return -1;
}


export class GetJobsUseCase {
    async execute(year: number, month: string) {

        // const mo = +getMonthFromString(month);
        // Receber userName, password
        // Verificar se o userName cadastrado
        const jobs =  await prisma.jobs.findMany({
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

    
        let total = 0;
        let total_1quarter = 0;
        let total_2quarter = 0;
        jobs.forEach((job: any)=>{
            job.quarter.forEach((quarter: any)=>{
                let total_hours = 0;
                quarter.appointment.forEach((appointment: any)=>{
                    total_hours += appointment.value;
                });
                quarter.total_hours = total_hours;
                quarter.total = total_hours * quarter.value_hour;
                if(quarter.order === 1) {
                    total_1quarter += total_hours * quarter.value_hour;
                }
                    
                if(quarter.order === 2) {
                    total_2quarter += total_hours * quarter.value_hour;
                } 
                    
                total += total_hours * quarter.value_hour;
            });
        });
        const result = [];
        result.push(jobs); 
        result.push({ total });
        result.push({ total_1quarter });
        result.push({ total_2quarter });
        
        // const result = (await jobs).reduce((acc:any, curr:any) => {
        //     const job = {...curr, quarter: curr.quarter.reduce((ac:any, current:any) => {
        //             const quarter = []
        //             quarter.push({...current, total: current.appointment.reduce((accumulator:any, currently:any) => {
        //               accumulator += currently.value;
        //               return accumulator;
        //             }, 0)
        //           });
        //           return quarter;
        //         }, []
          
        //       )
        //     }
        //     return job;
        //   }, []);

        // const res = await prisma.$queryRaw`
        //     SELECT sum(a.value) as total, 
        //     j.id 
        //     FROM jobs as j
        //     INNER JOIN quarters as q ON q.fk_id_job = j.id
        //     INNER JOIN appointments as a ON a.fk_id_quarter = q.id
        //     WHERE j.status = 'ACTIVE' AND q.year = ${year} AND q.month = ${month}
        //     GROUP BY j.id
        //     ;`
        
        // const res2 = await prisma.$queryRaw`
        //     SELECT sum(a.value) as total 
        //     FROM jobs as j
        //     INNER JOIN quarters as q ON q.fk_id_job = j.id
        //     INNER JOIN appointments as a ON a.fk_id_quarter = q.id
        //     WHERE j.status = 'ACTIVE' AND q.year = ${year} AND q.month = ${month}
        //     GROUP BY q.order
        //     ;`

        return result;
    }
}