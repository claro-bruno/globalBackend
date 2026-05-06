import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IUpdateOrder {
    id: number;
    status: string;
}


export class UpdateStatusOrderUseCase {
    async execute({ id, status }: IUpdateOrder): Promise<any> {


        //validar se o client existe
        const orderExist = await prisma.ordersMaterialsInventories.findFirst({
            where: {
                id,
            }
        });

        if (!orderExist || status === '') {
            throw new AppError('Order does not exists', 401)
        }





        await prisma.ordersMaterialsInventories.update({
            where: {
                id,
            },
            data: {
                status
            }
        });






        return 'ok';

    }



}