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
    collaborators?: string;
    email: string; 
    contact: string;
    contact_phone: string;
    address: string;
    total_hours: number;
    type: string;
    infos: any;
}

interface IInfo {
    order_id?: number;
    contractor_id?: number;
    start: string;
    end: string;
    total_hours: number;
}

export class CreateOrderUseCase {
    async execute({ date_at, description, notes, id_client, start, end, support, email, contact, contact_phone, address, total_hours, type, infos } : ICreateOrder): Promise<any>{
        //validar se o client existe
        const clientExist = await prisma.clients.findFirst({
           where: {
               id: id_client,
           }
        });
        console.log(infos);
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
                created_at: new Date(date_at),
                // collaborators, 
                support,
                email, 
                contact, 
                contact_phone, 
                address,
                total_hours, 
                type
            }
        });

        await infos.reduce(async (memo: any, info: IInfo) => {
            await memo;
            const id_contractor: number = Number(info.contractor_id)       
            const id_order: number = Number(order.id)         
            await prisma.orderContractors.create({
                data: {
                    fk_id_order: id_order,
                    fk_id_contractor: id_contractor,
                    start: info.start,
                    end: info.end,
                    total: +info.total_hours
                }
            });
        }, undefined);
        return order;
    }
}