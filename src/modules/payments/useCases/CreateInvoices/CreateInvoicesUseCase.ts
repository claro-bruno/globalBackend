
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface ICreatePayments {
    date_invoice: Date;
    value: number;
    payed_for: string;
    identification?: string;
    method: string;
    fk_id_client: number;
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

export class CreateInvoicesUseCase {
    async execute({ date_invoice, payed_for, value, method, identification, fk_id_client  }: ICreatePayments) {

        // const contractorExist = await prisma.contractors.findUnique({
        //     where: {
        //         id: +contractor_id as number,
        //     }
        //  });
 
        //  if(!contractorExist) {
        //      throw new AppError('Contractor does not exists', 400)
        //  }

        const date = new Date(date_invoice);
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
                type: 'INVOICE',
                fk_id_client
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
                    value: balanceExist.value + value
                }
            });
        }

        return 'Ok';
    }
}