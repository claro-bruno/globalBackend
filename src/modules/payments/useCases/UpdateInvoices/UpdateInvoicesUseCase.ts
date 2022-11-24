
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IUpdateInvoice {
    date_invoice: Date;
    value: number;
    payed_for: string;
    identification?: string;
    method?: string;
    fk_id_client: number;
    description?: string;
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
    async execute({ id, description, date_invoice, payed_for, value, identification, fk_id_client  }: IUpdateInvoice) {
        const month = toMonthName(new Date(date_invoice).getMonth());
        const year  = new Date(date_invoice).getFullYear();
        const invoiceExist = await prisma.invoices.findFirst({
            where: {
                id,
            }
         });
 
         if(!invoiceExist) {
             throw new AppError('Invoice does not exists', 400)
         }

        const date = new Date(date_invoice);
        await prisma.invoices.update({
            where: {
                id,
            },
            data: {
                value: +value,
                payed_for: payed_for,
                date_at: date,
                fk_id_client: +fk_id_client,
                identification,
                description,
                year
                }
            });
        
    

        return 'Ok';
    }
}