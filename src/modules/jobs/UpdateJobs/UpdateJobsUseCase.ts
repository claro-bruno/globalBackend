
import { prisma } from "../../../database/prismaClient";
import { AppError } from "../../../middlewares/AppError";

interface IAppointment {
    date: any;
    value: number;
}

interface IService {
    id: number;
    id_contractor: number;
    id_client: number;
    // sunday: boolean;
    // monday: boolean;
    // tuesday: boolean;
    // wednesday: boolean;
    // thursday: boolean;
    // friday: boolean;
    // saturday: boolean;
    // value: number;
    value_hour: number;
}

export class UpdateJobsUseCase {
    // async execute({ id, id_contractor, id_client, sunday, monday, tuesday, wednesday, thursday, friday, saturday, value, value_hour }: IService) {
    async execute({ id, id_contractor, id_client, value_hour }: IService) {
        const arrDays = [] as any;
        const arr = [] as any;
        const existJob = await prisma.jobs.findFirst({
            where: {
                id
            }
        });

        if(!existJob) {
            throw new AppError("Job does not exist");
        }

        const job = await prisma.jobs.update({
            where: {
                id
            },
            data: {
                fk_id_contractor: id_contractor,
                fk_id_client: id_client,
                // sunday,
                // monday,
                // tuesday,
                // wednesday,
                // thursday,
                // friday,
                // saturday
            }
        });


        const date = new Date(Date.now());
        const month = date.getMonth();
        const year = date.getFullYear();
        const quarter_option = new Date(Date.now()).getDay() > 15 ? 2 : 1;
        const last_date = new Date(year, month, 0);

        let quarterExist = await prisma.quarters.findFirst({
            where: {
                month,
                year,
                order: quarter_option,
                fk_id_job: id
            }
        });

        if(quarterExist) {
            quarterExist = await prisma.quarters.update({
                where: {
                    id: quarterExist.id
                },
                data: {
                    value_hour
                }
            });
        } else {
            quarterExist = await prisma.quarters.create({
                data: {
                    fk_id_job: job.id,
                    value_hour,
                    year,
                    month,
                    order: quarter_option,
                }
            });
        }


        // if(sunday) arrDays.push('Sunday');
        // if(monday) arrDays.push('Monday');
        // if(tuesday) arrDays.push('Tuesday');
        // if(wednesday) arrDays.push('Wednesday');
        // if(thursday) arrDays.push('Thursday');
        // if(friday) arrDays.push('Friday');
        // if(saturday) arrDays.push('Saturday');


        // const inicio = quarter_option === 1 ? 1 : 16;
        // const end = quarter_option === 1 ? 15 : last_date.getDate();

        // await prisma.appointments.deleteMany({
        //     where: {
        //         fk_id_quarter: quarterExist.id,

        //     }
        // });

        // for(let i=inicio; i<= end; i += 1) {
        //     let dataValue = new Date(year, month, i);
        //     if(arrDays.includes(dataValue.toLocaleString('default', {weekday: 'long'}))) {

        //         arr.push({date: dataValue, value});
        //     }
        //     else {
        //         arr.push({date: dataValue, value: 0});
        //     }
        // }

        // await arr.reduce(async (memo: any, { date, value }: IAppointment) => {
        //     await memo;
        //     await prisma.appointments.create({
        //         data: {
        //             fk_id_quarter: quarterExist.id,
        //             value,
        //             date_at: date
        //         }
        //     });

        // }, undefined);






        return 'Ok';
    }
}