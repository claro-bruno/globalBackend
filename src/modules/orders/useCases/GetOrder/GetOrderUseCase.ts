import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IGetOrder {
    id: number;
}

export class GetOrderUseCase {
    async execute({ id } : IGetOrder): Promise<any>{
        //validar se o client existe
        const orderExist = await prisma.orders.findFirst({
           where: {
               id,
           },
           include: {
            ordersContractors: true,
            invoices: true,
            client: true
           }
        });

        if(!orderExist) {
            throw new AppError('Order does not exists', 401)
        }

      
        return orderExist;
    }
}
