
import { prisma } from "../../../../database/prismaClient";


export class GetInventoriesUseCase {
    async execute() {
        const result = await prisma.inventories.findMany({
            orderBy: [{ name: 'asc' }],

            select: {
                id: true,
                created_at: true,
                name: true,
                description: true,
                unit_cost: true,
                url_image: true,
                status: true
            }
        });
        return result;


    }
}