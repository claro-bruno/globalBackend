
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface ICreateExpensive {
    date_invoice: Date;
    value: number;
    identification: string;
    fk_id_client: number;
    description?: string;
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

export class CreateInvoicesUseCase {
    async execute({ date_invoice, value, identification, fk_id_client, description  }: ICreateExpensive) {
        const month = toMonthName(new Date(date_invoice).getUTCMonth());
        const year  = new Date(date_invoice).getUTCFullYear();

        const invoiceExist = await prisma.invoices.findFirst({
            where: {
                identification: identification
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