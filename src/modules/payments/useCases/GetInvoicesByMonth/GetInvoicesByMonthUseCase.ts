
import { prisma } from "../../../../database/prismaClient";

interface IGetInvoices {
    month: string;
    year: number;
}


export class GetInvoicesByMonthUseCase {
    async execute({ month, year }: IGetInvoices) {
        const result = await prisma.invoices.findMany({
            orderBy: [{ date_at: 'desc' }],
            where: {
                month,
                year
            },
            select: {
                id: true,
                date_at: true,
                date_log: true,
                date_payment: true,
                method: true,
                ref: true,
                value: true,
                taxa: true,
                total: true,
                total_pago: true,
                quarter: true,
                identification: true,
                description: true,
                month: true,
                year: true,
                fk_id_order: true,
                fk_id_client: true,
                client: {
                    select: {
                        name: true,
                    }
                },
                fk_id_contractor: true,
                contractor: {
                    select: {
                        first_name: true,
                        last_name: true,
                    }
                }

            }
        });

        const sum_invoices = await prisma.invoices.aggregate({
            _sum: {
                total: true,
                total_pago: true
            },

            where: {
                month,
                year
            }
        });


        const total = sum_invoices._sum.total == null ? 0 : +sum_invoices._sum.total;
        const total_pago = sum_invoices._sum.total_pago == null ? 0 : +sum_invoices._sum.total_pago;
        return {
            invoices: result,
            total: {
                total,
                total_pago,
                diferenca: +total - +total_pago
            }
        };

    }
}