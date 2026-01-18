
import { prisma } from "../../../../database/prismaClient";


export class GetMaterialsUseCase {
    async execute() {

        const result: any = await prisma.$queryRaw`
          SELECT mat.id, mat.created_at, mat.name, mat.description, mat.unit_cost,  mat.url_image, mat.category, mat.fk_user,
          (SELECT SUM(itr.quantity) FROM public."materialsTransactions" AS itr WHERE itr.fk_id_material = mat.id AND itr.fk_id_output = 364) AS total_in,
          (SELECT SUM(itr.quantity) FROM public."materialsTransactions" AS itr WHERE itr.fk_id_material = mat.id AND itr.fk_id_output != 364) AS total_out,
          (SELECT c.first_name FROM public."contractors" AS c INNER JOIN public."materialsTransactions" as it ON it.fk_id_output = c.id  WHERE c.id = mat.fk_user) AS first_name
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