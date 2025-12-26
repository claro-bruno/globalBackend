
import { prisma } from "../../../../database/prismaClient";


export class GetInventoriesSequenceUseCase {
    async execute() {
        const result = await prisma.inventoriesSequence.findMany({
            orderBy: [{ fk_id_inventory: 'asc' }, { seq: 'asc' }],

            select: {
                id: true,
                seq: true,
                ref: true,
                year: true,
                month: true,
                fk_id_inventory: true,
                created_at: true,
                fk_user: true,
                users: {
                    select: {
                        first_name: true
                    },
                },
                inventories: {
                    select: {
                        name: true,
                        description: true,
                        unit_cost: true,
                        url_image: true,
                        status: true
                    }
                },
            }
        });
        return result;


    }
}