
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IDeleteteInventories {

    id: number;
}






export class DeleteInventoriesSequenceUseCase {
    async execute({ id }: IDeleteteInventories) {



        // console.log(id)
        // throw new AppError('Inventory does not exists', 400)


        const sequenceExist = await prisma.inventoriesSequence.findFirst({
            where: {
                id,
            }
        });




        if (!sequenceExist) {
            throw new AppError('Inventory does not exists', 400)
        }






        await prisma.logInventories.deleteMany({
            where: {
                fk_id_inventory_sequence: +id,
            },
        });

        await prisma.inventoriesTransactions.deleteMany({
            where: {
                fk_id_inventory_sequence: +id,
            },
        });

        await prisma.inventoriesSequence.delete({
            where: {
                id: +id,
            },
        });



        return 'Ok';
    }

}