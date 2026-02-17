
import { prisma } from "../../../../database/prismaClient";


export class GetInventoriesSequenceUseCase {
    async execute() {

        const result: any = await prisma.$queryRaw`
          SELECT itr.id as id_transaction, ise.id,inv.unit_cost, ise.ref,ise.id as fk_id_inventory_sequence, itr.fk_id_client,ise.seq,ise.status,ise.created_at,inv.name,ise.fk_id_inventory, inv.unit_cost as cost,itr.status as stat,

(SELECT name from public."clients" AS c WHERE c.id = itr.fk_id_client) as namelocation,
(SELECT first_name from public."contractors" AS co WHERE co.id = ise.fk_user) as nameuser
from public."inventoriesSequence" AS ise
          LEFT JOIN public."inventoriesTransactions" AS itr ON itr.fk_id_inventory_sequence = ise.id
		  INNER JOIN public."inventories" AS inv ON ise.fk_id_inventory = inv.id
		  INNER JOIN public."contractors" AS con ON con.id = ise.fk_user
          Order BY ise.fk_id_inventory ASC, ise.seq ASC
        `

        // const result = await prisma.inventoriesSequence.findMany({
        //     orderBy: [{ fk_id_inventory: 'asc' }, { seq: 'asc' }],

        //     select: {
        //         id: true,
        //         seq: true,
        //         ref: true,
        //         year: true,
        //         month: true,
        //         fk_id_inventory: true,
        //         created_at: true,
        //         fk_user: true,
        //         status: true,
        //         users: {
        //             select: {
        //                 first_name: true
        //             },
        //         },
        //         inventories: {
        //             select: {
        //                 name: true,
        //                 description: true,
        //                 unit_cost: true,
        //                 url_image: true,
        //                 status: true
        //             }
        //         },
        //     }
        // });

        // const result = await prisma.inventoriesSequence.findMany({
        //     orderBy: [{ fk_id_inventory: 'asc' }, { seq: 'asc' }],

        //     select: {
        //         id: true,
        //         seq: true,
        //         ref: true,
        //         year: true,
        //         month: true,
        //         fk_id_inventory: true,
        //         created_at: true,
        //         fk_user: true,
        //         status: true,
        //         users: {
        //             select: {
        //                 first_name: true
        //             },
        //         },
        //         inventories: {
        //             select: {
        //                 name: true,
        //                 description: true,
        //                 unit_cost: true,
        //                 url_image: true,
        //                 status: true
        //             }
        //         },
        //     }
        // });

        // await result.reduce(async (memo: any, info: any) => {
        //     await memo;
        //     const id: number = info?.id;
        //     const month: any = info?.month?.toString().padStart(2, '0');
        //     const seq: any = info?.seq < 10 ? info?.seq?.toString().padStart(2, '0') : info?.seq?.toString();
        //     const inv: any = info?.fk_id_inventory < 10 ? info?.fk_id_inventory?.toString().padStart(2, '0') : info?.fk_id_inventory?.toString();
        //     const year: any = info?.created_at.toLocaleDateString('en', { year: '2-digit' })
        //     // console.log(info.year, info.month, info.fk_id_inventory, info.seq,)
        //     const reference = `${year}-${month}-${inv}-${seq}`;
        //     // console.log('reference', reference)

        //     await prisma.inventoriesSequence.update({
        //         where: {
        //             id: id
        //         },
        //         data: {

        //             ref: reference,

        //         }
        //     });
        // }, undefined);

        return result;


    }
}