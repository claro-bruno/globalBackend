import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IUpdateOrder {
    id: number;
    invoice: string;
    fk_user: number;
}


export class UpdateInvoiceOrderUseCase {
    async execute({ id, invoice, fk_user }: IUpdateOrder): Promise<any> {


        //validar se o client existe
        const orderExist = await prisma.ordersMaterialsInventories.findFirst({
            where: {
                id,
            }
        });

        if (!orderExist || invoice === '') {
            throw new AppError('Order does not exists', 401)
        }





        await prisma.ordersMaterialsInventories.update({
            where: {
                id,
            },
            data: {
                fk_invoice: invoice,
                fk_user,
            }
        });






        return 'ok';

    }



}