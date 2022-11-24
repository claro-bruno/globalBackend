
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface ICreateExpensive {
    date_invoice: Date;
    value: number;
    payed_for: string;
    identification: string;
    fk_id_client: number;
    description?: string;
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
    async execute({ description, date_invoice, payed_for, value, identification, fk_id_client  }: ICreateExpensive) {

        const invoiceExist = await prisma.invoices.findFirst({
            where: {
                identification,
            }
         });
 
         if(invoiceExist) {
             throw new AppError('Invoice already exists', 400)
         }

        const date = new Date(date_invoice);
        await prisma.invoices.create({
            data: {
                value: +value,
                payed_for: payed_for,
                date_at: date,
                fk_id_client: +fk_id_client,
                identification,
                description

                }
            });
        
    

        return 'Ok';
    }
}