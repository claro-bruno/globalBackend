
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IDeleteteExpensives {

    id: number;
}






export class DeleteInvoicesUseCase {
    async execute({ id }: IDeleteteExpensives) {







        const invoiceExist = await prisma.invoices.findFirst({
            where: {
                id,
            }
        });




        if (!invoiceExist) {
            throw new AppError('Invoice does not exists', 400)
        }





        await prisma.invoices.delete({
            where: {
                id: +id,
            },
        });


        return 'Ok';
    }

}