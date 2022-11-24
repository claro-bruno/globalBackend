
import { prisma} from "../../../../database/prismaClient";
import { AppError} from "../../../../middlewares/AppError";

interface IGetInvoices {
    year: number;
}

export class GetInvoicesByYearUseCase {
    async execute({ year } : IGetInvoices) {

        const result = await prisma.invoices.groupBy({
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

        const total = sum_invoices._sum.value == null ? 0 : sum_invoices._sum.value;
        return {
            invoices: result,
            total: {
              total, 
            }
          };

    }
}