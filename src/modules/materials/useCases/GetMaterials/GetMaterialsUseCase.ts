
import { prisma } from "../../../../database/prismaClient";


export class GetMaterialsUseCase {
    async execute() {
        const result = await prisma.materials.findMany({
            orderBy: [{ id: 'asc' }],

            select: {
                id: true,
                created_at: true,
                name: true,
                description: true,
                unit_cost: true,
                status: true,
                url_image: true,
            }

        });
        return result;


    }
}