import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IGetExpensives {
    month: string;
    year: number;
}

function getMonthFromString(mon: string, year: number) {
    const d = Date.parse(mon + "1, " + year);
    if (!isNaN(d)) {
      return new Date(d).getMonth() - 1;
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



export class GetExpensivesByMonthUseCase {
    
    async execute({ year, month }:IGetExpensives) {
        
        const arrTypes: any = [
            "INPUT",
            "LABOUR_PAYROOL",
            "VAN_FUEL_OIL",
            "FUEL_OIL",
            "EQUIPMENT",
            "ADVERTISEMENT",
            "UNIFORM",
            "REPAIRS_MAINTENANCE",
            "OFFICE_EXPENSES",
            "MEALS",
            "CONTRACTOR",
            "CONTRACTOR_WORKERS",
            "CHEMICAL_CONSUMABLES",
            "INSURANCE_TAX",
            "EXTRAS",
            "GLOBAL"
        ];


        const result = await prisma.payments.findMany({
            where: {
                month,
                year
            }
        });

        const sumOutput = await prisma.payments.aggregate({
            _sum: {
                value: true
            },

            where: {
                month,
                year,
                NOT: {
                    type: {
                        equals: 'INPUT' as any
                    }
                }
            }
        });

        const sumContractorsWorkers = await prisma.payments.aggregate({
            _sum: {
                value: true
            },

            where: {
                month,
                year,
                type: 'CONTRACTOR_WORKERS'
            }
        });

        const sumInput = await prisma.payments.aggregate({
            _sum: {
                value: true
            },

            where: {
                month,
                year,
                type: 'INPUT' as any
            }
        });

      const lastMonth = month == 'January' ? 'December' : toMonthName(getMonthFromString(month, year));
      const lastYear = month == 'January' ? year - 1 : year;

      const balanceLastMonthExist = await prisma.balances.findFirst({
            where: {
                month: lastMonth,
                year: lastYear
            }
        });
        const balanceExist = await prisma.balances.findFirst({
            where: {
                month: month,
                year: year
            }
        });

        const resTypes = await prisma.payments.groupBy({
            by: ['type'],
            _sum: {
                value: true
            },
            where: {
                year,
                month
            }
        });

        const resultt: any = {};
        arrTypes.forEach((type: string) => {
            const payments_type = resTypes.find(
                (info: any) => info.type === type
              );
              resultt[`${type}`] = typeof payments_type === 'undefined' || payments_type === null ? 0 : payments_type._sum.value as any;

        });

        
        const total_input = sumInput._sum.value == null ? 0 : sumInput._sum.value;
        const total_output = sumOutput._sum.value == null ? 0 : sumOutput._sum.value;
        const total_contractor = sumContractorsWorkers._sum.value == null ? 0 : sumContractorsWorkers._sum.value;
        const balanceLastMonth = balanceLastMonthExist?.value == null ? 0 : balanceLastMonthExist?.value;
        const balanceMonth = balanceExist?.value == null ? 0 : balanceExist?.value;

        return {
            total: resultt,
            monthReports: result,
            total_input,
            total_output,
            total_contractor,
            balanceLastMonth,
            balanceMonth
        };



       
    }
}