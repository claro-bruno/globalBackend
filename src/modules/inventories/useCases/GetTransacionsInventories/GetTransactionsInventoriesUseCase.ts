
import { prisma } from "../../../../database/prismaClient";


export class GetTransactionsInventoriesUseCase {
    async execute() {
        const result = await prisma.inventoriesTransactions.findMany({
            orderBy: [{ created_at: 'desc' }],

            select: {
                id: true,
                created_at: true,
                fk_id_inventory: true,
                fk_id_client: true,
                sequence: true,
                quantity: true,
                total_cost: true,
                description: true,
                month: true,
                year: true,
                client: {
                    select: {
                        name: true,

                    }
                },
                inventory: {
                    select: {
                        name: true,
                        unit_cost: true,
                    }
                },

            }
        });
        return result;


    }
}