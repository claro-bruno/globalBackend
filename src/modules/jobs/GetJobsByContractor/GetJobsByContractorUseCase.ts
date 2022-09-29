
import { prisma } from "../../../database/prismaClient";
import { AppError } from "../../../middlewares/AppError";

function getMonthFromString(mon: string){

    var d = Date.parse(mon + "1, 2022");
    if(!isNaN(d)){
        return new Date(d).getMonth() + 1;
    }
    return -1;
}

export class GetJobsByContractorUseCase {
    async execute(id: number, year: number, month: string) {

        const jobs =  await prisma.jobs.findMany({
            where: {
                status: 'ACTIVE',
                fk_id_contractor: +id,
                quarter: {
                    some: { 
                        year: {
                            equals: year,
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

        // await prisma.jobs.groupBy({
        //     by: ['id'],
        //     where: {
        //         status: 'ACTIVE',
        //         quarter: {
        //             some: { 
        //                 year: {
        //                     equals: year,
        //                 },
        //                 month: {
        //                     equals: +getMonthFromString(month),
        //                 }
        //             }    
        //         }
        //     },
        
        //     _sum: {
                
        //     }
            
        // });

        // await prisma.jobs.aggregate({
        //     where: {
        //         status: 'ACTIVE',
        //         quarter: {
        //             some: { 
        //                 year: {
        //                     equals: year,
        //                 },
        //                 month: {
        //                     equals: +getMonthFromString(month),
        //                 }
        //             }    
        //         }
        //     },
            
        //     _sum: {

        //     }
            
        // });

        
        return result;

    }
}