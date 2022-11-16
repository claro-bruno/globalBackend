
import { stat } from "fs";
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface ICreatePayments {
    date_expensive: Date;
    value: number;
    payed_for: string;
    identification?: string;
    type: string;
    method: string;
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

export class CreateExpensivesUseCase {
    async execute({ date_expensive, payed_for, value, method, identification, type, status  }: ICreatePayments) {

        // const contractorExist = await prisma.contractors.findUnique({
        //     where: {
        //         id: +contractor_id as number,
        //     }
        //  });
 
        //  if(!contractorExist) {
        //      throw new AppError('Contractor does not exists', 400)
        //  }

        const date = new Date(date_expensive);
        const month = date.getMonth();
        const year = date.getFullYear();
         

       

        await prisma.payments.create({
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
        
        const balanceExist = await prisma.balances.findFirst({
            where: {
                month: month as any,
                year
            }
        });

        if(balanceExist) {
            await prisma.balances.update({
                where: {
                    id: balanceExist.id
                }, 
                data: {
                    value: balanceExist.value - value
                }
            });
        }
       

        return 'Ok';
    }
}