import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IGetInvoice {
    id: number;
}

export class GetInvoiceUseCase {
    async execute({ id } : IGetInvoice): Promise<any>{
        //validar se o client existe
        const orderExist = await prisma.orders.findFirst({
           where: {
               id,
           }
        });

        if(!orderExist) {
            throw new AppError('Invoice does not exists', 401)
        }

      
        return orderExist;
    }
}