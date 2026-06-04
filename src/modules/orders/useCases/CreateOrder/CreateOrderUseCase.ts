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
    date_at_end: string;
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
    date_at: string;
}

function getMonthFromString(mon: string) {
    var d = Date.parse(mon + "1, 2023");
    if (!isNaN(d)) {
        return new Date(d).getMonth() + 1;
    }
    return -1;
}

function toMonthName(monthNumber: number) {
    const date = new Date();
    date.setMonth(monthNumber);
    // console.log(monthNumber)
    return date.toLocaleString("en-US", {
        month: "long"
    });
}

export class CreateOrderUseCase {
    async execute({ date_at, date_at_end, description, notes, id_client, start, end, support, email, contact, contact_phone, address, total_hours, type, infos }: ICreateOrder): Promise<any> {



        //validar se o client existe
        const clientExist = await prisma.clients.findFirst({
            where: {
                id: id_client,
            }
        });
        if (!clientExist) {
            throw new AppError('Client does not exists', 401)
        }

        let total = 0;

        if (infos.length > 0) {
            total = infos.reduce((acc: number, currently: IInfo) => {
                return acc + Number(currently.total_hours)
            }, 0)
        }

        const dt = new Date(date_at)

        const fullYear = dt.getUTCFullYear();
        const fullMonth = dt.getUTCMonth() + 1;
        const fullMonthLiteral = toMonthName(fullMonth - 1);

        if (total > 0) {
            const order = await prisma.orders.create({
                data: {
                    start,
                    end,
                    fk_id_client: id_client,
                    description,
                    notes,
                    created_at: new Date(date_at),
                    month: fullMonthLiteral,
                    year: +fullYear,
                    ended_at: new Date(date_at_end),
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
                const date_at = new Date(info.date_at)
                await prisma.orderContractors.create({
                    data: {
                        fk_id_order: id_order,
                        fk_id_contractor: id_contractor,
                        start: info.start,
                        end: info.end,
                        created_at: new Date(date_at),
                        total: value_order
                    }
                });
            }, undefined);
            return order;
        }
        return 'ok';

    }
}