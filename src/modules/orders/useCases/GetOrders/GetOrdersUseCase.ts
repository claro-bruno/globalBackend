import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";


export class GetOrdersUseCase {
    async execute(): Promise<any>{
        return prisma.orders.findMany({
            select: {
                id: true,
                start: true,
                end: true,
                description: true,
                notes: true,
                created_at: true,
                fk_id_client: true,
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
    }
}