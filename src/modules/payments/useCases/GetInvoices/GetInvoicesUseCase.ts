
import { prisma } from "../../../../database/prismaClient";


export class GetInvoicesUseCase {
    async execute() {
        const result = await prisma.invoices.findMany({
            orderBy: [{ date_at: 'asc' }],

            select: {
                id: true,
                date_at: true,
                value: true,
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

        /*const sum_invoices = await prisma.invoices.aggregate({
            _sum: {
                value: true
            },

            where: {
                month,
                year
            }
        });*/


        // const total = sum_invoices._sum.value == null ? 0 : sum_invoices._sum.value;
        return result;


    }
}