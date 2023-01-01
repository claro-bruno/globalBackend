
import { prisma} from "../../../../database/prismaClient";

interface IGetInvoices {
    month: string;
    year: number;
}


export class GetInvoicesByMonthUseCase {
    async execute({ month, year } : IGetInvoices) {

        const result = await prisma.invoices.findMany({
            where: {
                month,
                year
            },
            select: {
               id: true,
               date_at: true,
               value: true,
               payed_for: true,
               identification: true,
               description: true,
               month: true,
               year: true,
               fk_id_client: true,
               client: {
                select: {
                    name: true,
                }
               }
            }
        });

        const sum_invoices = await prisma.invoices.aggregate({
            _sum: {
                value: true
            },

            where: {
                month,
                year
            }
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