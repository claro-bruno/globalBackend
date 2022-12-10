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
    collaborators?: string;
    email: string; 
    contact: string;
    contact_phone: string;
    address: string;
    isInvoice: boolean;
    total_hours: number;
    type?: string;
    infos?: any;
}

interface IInfo {
    order_id?: number;
    contractor_id?: number;
    start: string;
    end: string;
    total: string;
}

export class UpdateOrderUseCase {
    async execute({ id, type, date_at, description, notes, id_client, start, end, collaborators, support, email, contact, contact_phone, address, isInvoice, total_hours, infos } : IUpdateOrder): Promise<any>{
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
                // collaborators, 
                support,
                email, 
                type,
                contact, 
                contact_phone,
                address,
                isInvoice,
                total_hours
            }
        });

        await prisma.ordersContractors.deleteMany(
        { 
            where: { 
                fk_id_order: +id
            }
        });

        await infos.reduce(async (memo: any, info: IInfo) => {
            await memo;            
            await prisma.ordersContractors.create({
                data: {
                    fk_id_order: order.id as any,
                    fk_id_contractor: info.contractor_id,
                    start: info.start,
                    end: info.end,
                    total: +info.total
                }
            });
        }, undefined);
        
        return order;
    }
}