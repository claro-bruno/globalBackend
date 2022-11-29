import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IUpdateOrder {
    description: string;
    notes?: string;
    id_client: number;
    start: string;
    end: string;
    date_at: string;
    id: number;
    support?: string;
    colaborators?: string;
}

export class UpdateOrderUseCase {
    async execute({ id, date_at, description, notes, id_client, start, end, colaborators, support } : IUpdateOrder): Promise<any>{
        //validar se o client existe
        const orderExist = await prisma.orders.findFirst({
           where: {
               id,
           }
        });

        if(!orderExist) {
            throw new AppError('Order does not exists', 401)
        }

      
        const order = await prisma.orders.update({
            where: {
                id,
            },
            data: {
                start,
                end,
                fk_id_client: id_client,
                description,
                notes,
                created_at: new Date(date_at),
                colaborators, 
                support,
            }
        });
        return order;
    }
}