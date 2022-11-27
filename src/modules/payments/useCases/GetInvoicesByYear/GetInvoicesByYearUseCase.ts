
import { prisma} from "../../../../database/prismaClient";
import { AppError} from "../../../../middlewares/AppError";

interface IGetInvoices {
    year: number;
}

export class GetInvoicesByYearUseCase {
    async execute({ year } : IGetInvoices) {
        const result: any = {};
        const arrMonths: any = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];


        const result_months = await prisma.invoices.groupBy({
            by: ['month'],
            _sum: {
                value: true
            },
            where: {
                year
            }
        });


        const sum_invoices = await prisma.invoices.aggregate({
            _sum: {
                value: true
            },

            where: {
                year
            }
        });

        /*
         const payments_type = resTypes.find(
                (info: any) => info.type === type
              );
              resultt[`${type}`] = typeof payments_type === 'undefined' || payments_type === null ? 0 : payments_type._sum.value as any;
 
        */
        arrMonths.forEach((month:string) => {
            const infoResult: any = {};
            const invoice_info = result_months.find(
                (info: any) => info.month === month
            );
            result[`${month}`] = typeof invoice_info === 'undefined' || invoice_info === null ? 0 : invoice_info._sum.value as any;
            // result[`${month}`] = month;
            // infoResult.month = month;
            // infoResult.total = typeof invoice_info === 'undefined' || invoice_info === null ? 0 : invoice_info._sum.value as any;
            // result.push(infoResult);
        });

        const total = sum_invoices._sum.value == null ? 0 : sum_invoices._sum.value;
        return {
            invoices: result,
            total: {
              total, 
            }
          };

    }
}