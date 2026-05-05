
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IDeleteteInventories {

    id: number;
}






export class DeleteOrdersUseCase {
    async execute({ id }: IDeleteteInventories) {



        // console.log(id)
        // throw new AppError('Inventory does not exists', 400)


        const orderExist = await prisma.orders.findFirst({
            where: {
                id,
            }
        });




        if (!orderExist) {
            throw new AppError('Order does not exists', 400)
        }








        await prisma.orderContractors.deleteMany({
            where: {
                fk_id_order: +id,
            },
        });

        await prisma.orders.delete({
            where: {
                id: +id,
            },
        });



        return 'Ok';
    }

}