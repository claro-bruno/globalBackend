
import { prisma } from "../../../database/prismaClient";
import { AppError } from "../../../middlewares/AppError";


function getMonthFromString(mon: string){

    var d = Date.parse(mon + "1, 2022");
    if(!isNaN(d)){
        return new Date(d).getMonth() + 1;
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

export class CreateJobsByQuartersUseCase {
    async execute() {
        
        let order = new Date(Date.now()).getDay() <= 15 ? 1 : 2;
        const month = toMonthName(new Date(Date.now()).getMonth());
        
        const year = new Date(Date.now()).getFullYear()
        let arr: any = [];
        const quartersExists = await prisma.quarters.findMany({
            where: {
                month: month,
                year: +year,
                order: +order
            },
        });
        
        if(quartersExists.length == 0) {
            
            const activeJobs = await prisma.jobs.findMany({
                where: {
                    status: 'ACTIVE',
                }
            });

            await activeJobs.reduce(async (memo: any, job: any) => {
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
        }
        return 'Ok';
    }
}