import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

function getMonthFromString(mon: string, year: number){

    var d = Date.parse(mon + "1, " + year);
    if(!isNaN(d)){
        return new Date(d).getMonth();
    }
    return -1;
}

function toMonthName(monthNumber: number) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
  
    return date.toLocaleString('en-US', {
      month: 'long',
    });
}

export class GetExpensivesByMonthUseCase {
    async execute(year: number, month: string) {

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
                month,
                year            }
        });
        
        if(balanceLastMonthExist && !balanceExist) {
            await prisma.balances.create({
                data: {
                    year,
                    month,
                    value: balanceLastMonthExist.value
                }
            });
        }
        
        const paymentsExpenses = await prisma.payments.findMany({
            orderBy: [{
                id: 'asc'
            }],
            where: {
                month,
                year
            },
            select: {
                id: true,
                date_at: true,
                method: true,
                month: true,
                year: true,
                type: true,
                status: true,
                pay_des_for: true,
            }
        });
    }
}