
import { prisma } from "../../../database/prismaClient";
import { AppError } from "../../../middlewares/AppError";

function getMonthFromString(mon: string){

    const d = Date.parse(mon + "1, 2022");
    if(!isNaN(d)){
        return new Date(d).getMonth();
    }
    return -1;
}

function toMonthName(monthNumber: number) {
    const date = new Date();
    date.setMonth(monthNumber);
  
    return date.toLocaleString('en-US', {
      month: 'long',
    });
  }

interface IAppointment {
    date: any;
    value: number;
}



export class GetJobsUseCase {
    async execute(year: number, month: string) {
        let activeJobs: any = [];
        let activeQuarters: any = [];
        let order = new Date(Date.now()).getDay() <= 15 ? 1 : 2;
        const actualMonth = toMonthName(new Date(Date.now()).getMonth());
        let arr: any = [];
        const quarterExists = await prisma.quarters.findMany({
            where: {
                // jobs: {
                //     status: 'ACTIVE',
                // },
                month: month,
                year: +year,
                order: +order
            },
        });
        if(quarterExists.length == 0 && actualMonth == month) {
        // if(quarterExists.length == 0) {
            
            const activeJobss = await prisma.jobs.findMany({
                where: {
                    status: 'ACTIVE',
                    
                }
            });

            await activeJobss.reduce(async (memo: any, job: any) => {
                await memo;
                arr = [];
                let last_value = await prisma.quarters.findFirst({
                    orderBy: [{
                        order: 'desc'
                    }],
                    where: {
                        fk_id_job: +job.id,
                    },
                    select: {
                        value_hour: true
                    }
                });
                
                if(last_value?.value_hour != undefined) {
                    let quarterCreated = await prisma.quarters.create({
                        data: {
                            fk_id_job: +job.id,
                            value_hour: +last_value?.value_hour,
                            year,
                            month,
                            order
                        }
                    });

                    const last_date = new Date(year, +getMonthFromString(month), 0);
                    const inicio = order === 1 ? 1 : 16;
                    const fim = order === 1 ? 15 : last_date.getDate();

                    for(let i=inicio; i<= fim; i += 1) {
                        let dataValue = new Date(year, +getMonthFromString(month), i);
                        arr.push({ date: dataValue, value: 0 });
                    }

                    await arr.reduce(async (memo: any, { date, value }: IAppointment) => {
                        await memo;
                        await prisma.appointments.create({
                            data: {
                                fk_id_quarter: +quarterCreated.id,
                                value: +value,
                                date: date
                            }
                        });
            
                    }, undefined);
                    
                }


                

                
    
            }, undefined);

            activeJobs = await prisma.jobs.findMany({
                orderBy: [{
                    id: 'asc'
                }],
                where: {
                    status: 'ACTIVE',
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
                }
            });
    
            activeQuarters = await prisma.quarters.findMany({
                orderBy: [{
                    fk_id_job: 'asc'
                }],
                where: {
                    month,
                    year: +year,
                    jobs: {
                        status: 'ACTIVE'
                    }
                },
                select: {
                    fk_id_job: true,
                    order: true,
                    month: true,
                    year: true,
                    value_hour: true,
                    status: true,
                    taxes: true,
                    shirts: true,
                    appointment: 
                    {
                        select: 
                        {
                            date: true,
                            value: true,
                        }
                    }
                }
    
    
            });

            
        } else {
            activeJobs = await prisma.jobs.findMany({
                orderBy: [{
                    id: 'asc'
                }],
                // where: {
                //     status: 'ACTIVE',
                // },
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
                }
            });
    
            activeQuarters = await prisma.quarters.findMany({
                orderBy: [{
                    fk_id_job: 'asc'
                }],
                where: {
                    month,
                    year: +year,
                    jobs: {
                        // status: 'ACTIVE'
                    }
                },
                select: {
                    fk_id_job: true,
                    order: true,
                    month: true,
                    year: true,
                    value_hour: true,
                    status: true,
                    taxes: true,
                    shirts: true,
                    appointment: 
                    {
                        select: 
                        {
                            date: true,
                            value: true,
                        }
                    }
                }
    
    
            });
        }

        // const activeJobs = await prisma.jobs.findMany({
        //     orderBy: [{
        //         id: 'asc'
        //     }],
        //     // where: {
        //     //     status: 'ACTIVE',
        //     // },
        //     select: {
        //         id: true,
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
        //              }
        //         },
        //     }
        // });

        // const activeQuarters = await prisma.quarters.findMany({
        //     orderBy: [{
        //         fk_id_job: 'asc'
        //     }],
        //     where: {
        //         month,
        //         year: +year,
        //         jobs: {
        //             // status: 'ACTIVE'
        //         }
        //     },
        //     select: {
        //         fk_id_job: true,
        //         order: true,
        //         month: true,
        //         year: true,
        //         value_hour: true,
        //         status: true,
        //         taxes: true,
        //         shirts: true,
        //         appointment: 
        //         {
        //             select: 
        //             {
        //                 date: true,
        //                 value: true,
        //             }
        //         }
        //     }


        // });
        
        const quartersGrouped = groupBy(activeQuarters, (quarter: any) => quarter.fk_id_job);
        if(activeQuarters.length > 0) {
            activeJobs.forEach((job: any) => {
                let quarter_info = quartersGrouped.get(job.id);
                job.quarter = quarter_info;
    
            });

            let total = 0;
            let total_1quarter = 0;
            let total_2quarter = 0;
            activeJobs.forEach((job: any)=>{
                job.quarter.forEach((quarter: any)=>{
                    let total_hours = quarter.appointment.reduce((acc: number, curr: any) => acc  += curr.value, 0);
                    quarter.status = quarter.status;
                    quarter.taxes = quarter.taxes;
                    quarter.shirts = quarter.shirts;

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
            return activeJobs;
        } else {
            return [];
        }
        

        
        // const jobsTeste =  await prisma.jobs.findMany({
            
        //     select: {
        //         id: true,
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
        //              }
        //         },
        //         quarter: {
        //             where: {
        //                     month,
        //                     year: +year,            
        //             },          
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
        //     },
        //     where: {

        //         status: 'ACTIVE',      
        //     },
        // });
        

        // jobs.forEach((job: any) => {
        //     let result = job.quarter.filter((quarter: any) => {
        //         return quarter.month == month && quarter.year == year;
        //     });
        //     job.quarter = result;
        // });
        

        

        
    

        

        
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