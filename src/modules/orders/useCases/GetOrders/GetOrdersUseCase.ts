import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";


export class GetOrdersUseCase {
    async execute(): Promise<any>{
        return prisma.orders.findMany({
            orderBy: [
            {
                id: "asc"
            }],
            include: {
                ordersContractors: 
                { 
                    include: 
                    { 
                        contractor: true 
                    } 
                },
                client: true
            }
        });
    }
}
