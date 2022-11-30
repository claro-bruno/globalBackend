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
           select: {
            id: true,
            start: true,
            end: true,
            description: true,
            notes: true,
            created_at: true,
            fk_id_client: true,
            colaborators: true,
            support: true,
            client: {
             select: {
                 name: true,
                 address: true,
                 contact: true,
                 contact_phone: true,
             }
            }
        }
        });

        if(!orderExist) {
            throw new AppError('Order does not exists', 401)
        }

      
        return orderExist;
    }
}