
import { prisma} from "../../../../database/prismaClient";
import { AppError} from "../../../../middlewares/AppError";

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