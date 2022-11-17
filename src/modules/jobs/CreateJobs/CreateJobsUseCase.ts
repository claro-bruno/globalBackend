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
  value_hour: number;
}

function getMonthFromString(mon: string) {
  var d = Date.parse(mon + "1, 2022");
  if (!isNaN(d)) {
    return new Date(d).getMonth() + 1;
  }
  return -1;
}

function toMonthName(monthNumber: number) {
  const date = new Date();
  date.setMonth(monthNumber);

  return date.toLocaleString("en-US", {
    month: "long"
  });
}

export class CreateJobsUseCase {
  async execute({
    id_contractor,
    id_client,
    sunday,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    value,
    value_hour
  }: IService) {
    const arrDays = [];
    let arr = [];
    const existJob = await prisma.jobs.findFirst({
      where: {
        fk_id_contractor: id_contractor,
        fk_id_client: id_client,
        status: "ACTIVE"
      }
    });

    if (existJob) {
      throw new AppError("Job already exist");
    }

    const job = await prisma.jobs.create({
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
    const date = new Date(Date.now());
    const month = date.getMonth();
    const year = date.getFullYear();

    if (sunday) arrDays.push("Sunday");
    if (monday) arrDays.push("Monday");
    if (tuesday) arrDays.push("Tuesday");
    if (wednesday) arrDays.push("Wednesday");
    if (thursday) arrDays.push("Thursday");
    if (friday) arrDays.push("Friday");
    if (saturday) arrDays.push("Saturday");

    if (new Date(Date.now()).getDay() <= 15) {
      const quarter_1 = await prisma.quarters.create({
        data: {
          fk_id_job: job.id,
          value_hour,
          year,
          month: toMonthName(month),
          order: 1
        }
      });

      for (let i = 1; i <= 15; i += 1) {
        let dataValue = new Date(year, month, i);
        if (
          arrDays.includes(
            dataValue.toLocaleString("default", { weekday: "long" })
          )
        ) {
          arr.push({ date: dataValue, value });
        } else {
          arr.push({ date: dataValue, value: 0 });
        }
      }

      await arr.reduce(async (memo: any, { date, value }: IAppointment) => {
        await memo;
        await prisma.appointments.create({
          data: {
            fk_id_quarter: quarter_1.id,
            value,
            date: date
          }
        });
      }, undefined);
    }

    const last_date = new Date(year, month + 1, 0);

    const quarter_2 = await prisma.quarters.create({
      data: {
        fk_id_job: job.id,
        value_hour,
        year,
        month: toMonthName(month),
        order: 2
      }
    });

    arr = [];

    for (let i = 16; i <= last_date.getDate(); i += 1) {
      let dataValue = new Date(year, month, i);
      if (
        arrDays.includes(
          dataValue.toLocaleString("default", { weekday: "long" })
        )
      ) {
        arr.push({ date: dataValue, value });
      } else {
        arr.push({ date: dataValue, value: 0 });
      }
    }

    await arr.reduce(async (memo: any, { date, value }: IAppointment) => {
      await memo;
      await prisma.appointments.create({
        data: {
          fk_id_quarter: quarter_2.id,
          value,
          date: date
        }
      });
    }, undefined);

    return "Ok";
  }
}
