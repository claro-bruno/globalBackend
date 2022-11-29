import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface ICreateOrder {
    description: string;
    notes?: string;
    id_client: number;
    start: string;
    end: string;
    date_at: string;
    support?: string;
    colaborators?: string;
}

export class CreateOrderUseCase {
    async execute({ date_at, description, notes, id_client, start, end, colaborators, support } : ICreateOrder): Promise<any>{
        //validar se o client existe
        const clientExist = await prisma.clients.findFirst({
           where: {
               id: id_client,
           }
        });

        if(!clientExist) {
            throw new AppError('Client does not exists', 401)
        }

      
        const order = await prisma.orders.create({
            data: {
                start,
                end,
                fk_id_client: id_client,
                description,
                notes,
                colaborators, 
                support,
                created_at: new Date(date_at)
            }
        });
        return order;
    }
}