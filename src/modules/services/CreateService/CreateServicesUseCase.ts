
import { prisma } from "../../../database/prismaClient";
import { AppError } from "../../../middlewares/AppError";

interface IAppointment {
    date: any;
    value: number;
}

interface IService {
    id_contractor: number;
    id_client: number;
    sunday: boolean;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    value: number;
    year: number;
    month: string;
    quarter_option: number;
}

function getMonthFromString(mon: string){

    var d = Date.parse(mon + "1, 2022");
    if(!isNaN(d)){
        return new Date(d).getMonth() + 1;
    }
    return -1;
}

export class CreateServicesUseCase {
    async execute({ id_contractor, id_client, sunday, monday, tuesday, wednesday, thursday, friday, saturday, value, year, month, quarter_option }: IService) {
        const arrDays = [];
        const arr = [];
        const existService = await prisma.services.findFirst({
            where: {
                fk_id_contractor: id_contractor,
                fk_id_client: id_client,
                status: true,
            }
        });

        if(existService) {
            throw new AppError("Service already exist");
        }

        const service = await prisma.services.create({
            data: {
                fk_id_contractor: id_contractor,
                fk_id_client: id_client,
                monday,
                sunday,
                tuesday,
                wednesday,
                thursday,
                friday,
                saturday
            }
        });

        const quarter = await prisma.quarters.create({
            data: {
                fk_id_service: service.id,
                value_hour: value,
                year,
                month
            }
        });

        if(sunday) arrDays.push('Sunday');
        if(monday) arrDays.push('Monday');
        if(tuesday) arrDays.push('Tuesday');
        if(wednesday) arrDays.push('Wednesday');
        if(thursday) arrDays.push('Thursday');
        if(friday) arrDays.push('Friday');
        if(saturday) arrDays.push('Saturday');


        const monthValue = getMonthFromString(month);


        const last_date = new Date(year, monthValue, 0);

        const inicio = quarter_option === 1 ? 1 : 16;
        const end = quarter_option === 1 ? 15 : last_date.getDate();

        for(let i=inicio; i<= end; i += 1) {
            let dataValue = new Date(year, monthValue, i);
            if(arrDays.includes(dataValue.toLocaleString('default', {weekday: 'long'}))) {

                arr.push({date: dataValue, value});
            }
            else {
                arr.push({date: dataValue, value: 0});
            }
        }

        await arr.reduce(async (memo: any, { date, value }: IAppointment) => {
            await memo;
            await prisma.appointments.create({
                data: {
                    fk_id_quarter: quarter.id,
                    value,
                    date_at: date
                }
            });

        }, undefined);






        return 'Ok';
    }
}