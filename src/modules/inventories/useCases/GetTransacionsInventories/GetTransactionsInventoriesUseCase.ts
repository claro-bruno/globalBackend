
import { prisma } from "../../../../database/prismaClient";


export class GetTransactionsInventoriesUseCase {
    async execute() {
        const result = await prisma.inventoriesTransactions.findMany({
            orderBy: [{ created_at: 'asc' }],

            select: {
                id: true,
                created_at: true,
                fk_id_inventory_sequence: true,
                fk_id_client: true,
                description: true,
                cost: true,
                fk_user: true,
                status: true,
                users: {
                    select: {
                        first_name: true,
                        id: true,
                    }
                },
                client: {
                    select: {
                        name: true,
                    }
                },
                inventorySequence: {
                    select: {
                        ref: true,
                        inventories: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }


            }
        });
        return result;


    }
}