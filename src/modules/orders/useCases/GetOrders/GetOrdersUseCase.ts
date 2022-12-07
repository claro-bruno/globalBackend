import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";


export class GetOrdersUseCase {
    async execute(): Promise<any>{
        return prisma.orders.findMany({
            orderBy: [
                {
                    id: "asc"
                }],
            select: {
                id: true,
                start: true,
                end: true,
                description: true,
                notes: true,
                created_at: true,
                fk_id_client: true,
                collaborators: true,
                support: true,
                email: true,
                contact: true,
                contact_phone: true,
                address: true,
                invoices: {
                    select: {
                        id: true,
                        identification: true,
                    }
                },
                client: {
                 select: {
                     name: true,
                 }
                }
            }
        });
    }
}