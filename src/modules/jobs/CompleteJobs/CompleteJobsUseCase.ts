import { prisma } from "../../../database/prismaClient";
import { AppError } from "../../../middlewares/AppError";

interface IServiceComplete {
  id: number;
  month: string;
  year: number;
  valueHour: number;
  quarter: number;
  others: number;
  status: string;
  status_payment: string;
  // workedDaysInfos: { dateValue: string }[];
}

interface IAppointment {
  date: any;
  value: number;
}

function getMonthFromString(mon: string) {
  var d = Date.parse(mon + "1, 2023");
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

export class CompleteJobsUseCase {
  async execute({
    id,
    month,
    year,
    valueHour,
    quarter,
    status,
    status_payment,
    others,
    // workedDaysInfos
  }: IServiceComplete) {
    const arr = [] as any;
    let dia: string = '';
    let dia_res : string = '';
    let mes : string = '';
    let mes_res : string = '';

    
    const jobExist = await prisma.jobs.findFirst({
      where: {
        id
      }
    });

    if (!jobExist) {
      throw new AppError("Job does not exists");
    }

    await prisma.jobs.update({
      where: {
        id
      },
      data: {
        status: status as any,

      }
    });

    let quarterResult = await prisma.quarters.findFirst({
      where: {
        // month: getMonthFromString(month),
        month,
        year,
        order: +quarter,
        fk_id_job: id
      }
    });
    if (!quarterResult) {
      quarterResult = await prisma.quarters.create({
        data: {
          fk_id_job: id,
          value_hour: +valueHour,
          year,
          // month: getMonthFromString(month),
          month,
          order: quarter
        }
      });
    } else {
      await prisma.quarters.update({
        where: {
          id: quarterResult.id
        },
        data: {
          status: status_payment as any,
          value_hour: +valueHour,
          others: +others
        }
      });
    }
    
    // const last_date = new Date(year, +getMonthFromString(month)+1, 0);
    // const start = quarter === 1 ? 1 : 16;
    // const end = quarter === 1 ? 15 : last_date.getDate();
    
    // workedDaysInfos.forEach((info: { dateValue: string }) => {
    //   mes_res = (getMonthFromString(month)+1).toString() 
    //   mes = mes_res.length === 1 ? `0${mes_res}` : mes_res
    //   dia_res = new Date(Object.keys(info)[0]).getUTCDate().toString()
    //   dia = dia_res.length === 1 ? `0${dia_res}` : dia_res
    //   let dataValue = `${year}-${mes}-${dia}T00:00:00.000Z`
    //   arr.push({
    //     date: dataValue,
    //     value: +Object.values(info)[0]
    //   });
    //   // let appoint: IAppointment = {date: Object.keys(info)[0],value: +Object.values(info)[0]};
    //   // arr.push(appoint);
    // });
   
    // await prisma.appointments.deleteMany({
    //   where: {
    //     fk_id_quarter: quarterResult.id
    //   }
    // });
    // if (quarterResult) {
    //   await arr.reduce(async (memo: any, { date, value }: IAppointment) => {
    //     await memo;
    //     await prisma.appointments.create({
    //       data: {
    //         fk_id_quarter: quarterResult?.id as any,
    //         value: +value,
    //         date: date
    //       }
    //     });
    //   }, undefined);
    // }

    return "Ok";
  }
}
