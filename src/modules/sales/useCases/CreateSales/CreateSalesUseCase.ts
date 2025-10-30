import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";
import { hash } from "bcrypt";

interface ISales {
    name?: string;
    contact?: string;
    email?: string;
    phone?: string;
    region?: string;
    status?: string;
    bid?: string;
    contractor_id: number;
    month?: string;
    year?: number;
    date_at: Date;
}

function toMonthName(monthNumber: number) {
    const date = new Date();
    date.setMonth(monthNumber);

    return date.toLocaleString("en-US", {
        month: "long"
    });
}


export class CreateSalesUseCase {
    async execute({ name, contact, email, phone, region, status, bid, contractor_id, date_at }: ISales): Promise<any> {




        const data_venda = new Date(date_at);
        // const data_venda = date_at ? new Date(date_at) : undefined;

        const month = toMonthName(new Date(date_at).getUTCMonth());
        const year = new Date(date_at).getUTCFullYear();

        const sales = await prisma.sales.create({
            data: {

                fk_id_contractor: +contractor_id,
                created_at: data_venda,
                month,
                year,
                name,
                contact,
                email,
                phone,
                region,
                status,
                bid

            }
        });
        return sales;
    }
}