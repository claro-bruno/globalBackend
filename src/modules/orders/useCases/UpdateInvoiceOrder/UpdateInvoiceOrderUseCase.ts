import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IUpdateOrder {
    id: number;
    invoice: string;
}


export class UpdateInvoiceOrderUseCase {
    async execute({ id, invoice }: IUpdateOrder): Promise<any> {


        //validar se o client existe
        const orderExist = await prisma.orders.findFirst({
            where: {
                id,
            }
        });

        if (!orderExist || invoice === '') {
            throw new AppError('Order does not exists', 401)
        }





        await prisma.orders.update({
            where: {
                id,
            },
            data: {
                fk_invoice_id: invoice
            }
        });






        return 'ok';

    }



}