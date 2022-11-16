
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IUpdatePayments {
    date_expensive: Date;
    value: number;
    payed_for: string;
    identification?: string;
    type: string;
    method: string;
    id: number;
    status: string;
}

function getMonthFromString(mon: string){

    var d = Date.parse(mon + "1, 2022");
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

export class UpdateExpensivesUseCase {
    async execute({ date_expensive, payed_for, value, method, identification, type, status, id  }: IUpdatePayments) {

        const expensiveExist = await prisma.payments.findUnique({
            where: {
                id,
            }
         });
 
         if(!expensiveExist) {
             throw new AppError('Expensive does not exists', 400)
         }

        const date = new Date(date_expensive);
        const month = date.getMonth();
        const year = date.getFullYear();
         

       

        await prisma.payments.update({
            where: {
                id
            },
            data: {
                value: +value,
                method: method as any,
                year: +year,
                month: toMonthName(month),
                identification,
                pay_des_for: payed_for,
                type: type as any,
                status: status as any
                }
            });

        return 'Ok';
    }
}