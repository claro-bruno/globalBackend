import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IUpdateOrder {
    id: number;
    comments: string;
    fk_user: number;
}


export class UpdateCommentsOrderUseCase {
    async execute({ id, comments, fk_user }: IUpdateOrder): Promise<any> {


        //validar se o client existe
        const orderExist = await prisma.ordersMaterialsInventories.findFirst({
            where: {
                id,
            }
        });

        if (!orderExist || comments === '') {
            throw new AppError('Order does not exists', 401)
        }





        await prisma.ordersMaterialsInventories.update({
            where: {
                id,
            },
            data: {
                description: comments,
                fk_user,
            }
        });






        return 'ok';

    }



}