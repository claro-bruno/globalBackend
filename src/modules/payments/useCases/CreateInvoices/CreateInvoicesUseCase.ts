
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface ICreateExpensive {
    date_invoice: Date;
    value: number;
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
    async execute({ description, date_invoice, value, identification, fk_id_client  }: ICreateExpensive) {
        const month = toMonthName(new Date(date_invoice).getMonth());
        const year  = new Date(date_invoice).getFullYear();
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
                date_at: date,
                fk_id_client: +fk_id_client,
                identification,
                description,
                month,
                year

                }
            });
        
    

        return 'Ok';
    }
}