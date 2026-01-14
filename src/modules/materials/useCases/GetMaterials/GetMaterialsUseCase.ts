
import { prisma } from "../../../../database/prismaClient";


export class GetMaterialsUseCase {
    async execute() {

        const result: any = await prisma.$queryRaw`
          SELECT mat.id, mat.created_at, mat.name, mat.description, mat.unit_cost, mat.status, mat.url_image,
          (SELECT SUM(itr.quantity) FROM public."materialsTransactions" AS itr WHERE itr.fk_id_material = mat.id) AS total
from public."materials" AS mat
          Order BY mat.id ASC
        `

        // const result = await prisma.materials.findMany({
        //     orderBy: [{ id: 'asc' }],

        //     select: {
        //         id: true,
        //         created_at: true,
        //         name: true,
        //         description: true,
        //         unit_cost: true,
        //         status: true,
        //         url_image: true,
        //     }

        // });
        return result;


    }
}