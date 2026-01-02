
import { prisma } from "../../../../database/prismaClient";


export class GetInventoriesLogUseCase {
    async execute() {
        const result = await prisma.logInventories.findMany({
            orderBy: [{ inventorySequence: { fk_id_inventory: 'asc' } }, { inventorySequence: { seq: 'asc' } }],

            select: {
                id: true,
                created_at: true,
                new_status: true,
                description: true,
                previous_status: true,
                fk_id_inventory_sequence: true,
                fk_id_location: true,
                location: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                inventorySequence: {
                    select: {
                        ref: true,
                        fk_id_inventory: true,
                        inventories: {
                            select: {
                                id: true,
                                name: true,
                                description: true,
                            }
                        }
                    }
                },

            }
        });
        return result;


    }
}