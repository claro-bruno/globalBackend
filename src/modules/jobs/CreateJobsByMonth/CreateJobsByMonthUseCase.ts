import { prisma } from "../../../database/prismaClient"
// import { AppError } from "../../../middlewares/AppError";



function getMonthFromString(mon: string) {
    var d = Date.parse(mon + "1, 2022");
    if (!isNaN(d)) {
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

export class CreateJobsByMonthUseCase {
    async execute(month: string, year: number) {
        let arr: any = [];
        let dia: string = '';
        let dia_res: string = '';
        let mes: string = '';
        let mes_res: string = '';



        const quartersExists = await prisma.quarters.findMany({
            where: {
                month: month,
                year: +year
            },
        });

        if (quartersExists.length == 0) {

            const activeJobs = await prisma.jobs.findMany({
                where: {
                    status: 'ACTIVE',
                }
            });

            await activeJobs.reduce(async (memo: any, job: any) => {
                await memo;
                arr = [];
                let last_value = await prisma.quarters.findMany({
                    orderBy: [{
                        id: 'asc'
                    }],
                    where: {
                        fk_id_job: +job.id,
                    },
                    select: {
                        value_hour: true,
                        month: true,
                    }
                });

                if (last_value[+last_value.length - 1]?.value_hour != undefined) {
                    const last_date = new Date(year, +getMonthFromString(month) + 1, 0);
                    let quarterCreated = await prisma.quarters.create({
                        data: {
                            fk_id_job: +job.id,
                            value_hour: +last_value[+last_value.length - 1]?.value_hour,
                            year,
                            month,
                            order: 1
                        }
                    });


                    let inicio = 1;
                    let fim = 15;

                    for (let i = inicio; i <= fim; i += 1) {
                        mes_res = (getMonthFromString(month) + 1).toString()
                        mes = mes_res.length === 1 ? `0${mes_res}` : mes_res
                        dia_res = i.toString()
                        dia = dia_res.length === 1 ? `0${dia_res}` : dia_res
                        let dataValue = `${year}-${mes}-${dia}T00:00:00.000Z`
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

                    arr = [];
                    quarterCreated = await prisma.quarters.create({
                        data: {
                            fk_id_job: +job.id,
                            value_hour: +last_value[+last_value.length - 1]?.value_hour,
                            year,
                            month,
                            order: 2
                        }
                    });


                    inicio = 16;
                    fim = last_date.getDate();

                    for (let i = inicio; i <= fim; i += 1) {
                        mes_res = (getMonthFromString(month) + 1).toString()
                        mes = mes_res.length === 1 ? `0${mes_res}` : mes_res
                        dia_res = i.toString()
                        dia = dia_res.length === 1 ? `0${dia_res}` : dia_res
                        let dataValue = `${year}-${mes}-${dia}T00:00:00.000Z`
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
        console.log('Terminou!');
        return 'Ok';
    }
}