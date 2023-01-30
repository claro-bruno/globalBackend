import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";
import { contractorsRoutes } from "../../../../routes/contractors.routes";

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
    total_hours?: number;
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
        if(!clientExist) {
            throw new AppError('Client does not exists', 401)
        }

        let total = 0;
        
        if(infos.length > 0) {
            total = infos.reduce((acc: number, currently: IInfo) => {
                return acc + Number(currently.total_hours)
            }, 0)
        }

        

        if(total> 0) {
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
                    total_hours: Number(total), 
                    type
                }
            });
            
            await infos.reduce(async (memo: any, info: IInfo) => {
                await memo;
                const id_contractor: number = Number(info.contractor_id)       
                const id_order: number = Number(order.id) 
                const value_order: number = Number(info.total_hours)           
                await prisma.orderContractors.create({
                    data: {
                        fk_id_order: id_order,
                        fk_id_contractor: id_contractor,
                        start: info.start,
                        end: info.end,
                        total: value_order
                    }
                });
            }, undefined);
            return order;
        }
        return 'ok';
       
    }
}