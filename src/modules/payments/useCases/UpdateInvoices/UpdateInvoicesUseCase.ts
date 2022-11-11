
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IUpdateInvoice {
    date_invoice: Date;
    value: number;
    payed_for: string;
    identification?: string;
    method: string;
    fk_id_client: number;
    id: number;
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

export class UpdateInvoicesUseCase {
    async execute({ date_invoice, payed_for, value, method, identification, fk_id_client, id  }: IUpdateInvoice) {

        const invoiceExist = await prisma.contractors.findUnique({
            where: {
                id,
            }
         });
 
         if(!invoiceExist) {
             throw new AppError('Invoice does not exists', 400)
         }

        const date = new Date(date_invoice);
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
                type: 'INVOICE',
                fk_id_client
                }
            });

        return 'Ok';
    }
}