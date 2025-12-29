
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