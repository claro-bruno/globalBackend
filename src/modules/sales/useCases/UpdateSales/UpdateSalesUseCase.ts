import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";
import { hash } from "bcrypt";

interface ISales {
    contact?: string;
    email?: string;
    phone?: string;
    region?: string;
    status?: string;
    bid?: string;
    contractor: number;
    month?: string;
    year?: number;
    date_sales: Date;
    id: number;
    name?: string;
}

function toMonthName(monthNumber: number) {
    const date = new Date();
    date.setMonth(monthNumber);

    return date.toLocaleString("en-US", {
        month: "long"
    });
}

export class UpdateSalesUseCase {
    async execute({ name, contact, email, phone, region, status, bid, contractor, date_sales, id }: ISales): Promise<any> {


        const salesExist = await prisma.sales.findFirst({
            where: {
                id,
            }
        });




        if (!salesExist) {
            throw new AppError('Sales does not exists', 400)
        }

        const month = toMonthName(new Date(date_sales).getUTCMonth());
        const year = new Date(date_sales).getUTCFullYear();

        const data_venda = date_sales ? new Date(date_sales) : undefined;

        const sales = await prisma.sales.update({

            where: {
                id,
            },
            data: {
                name,
                contact,
                email,
                phone,
                region,
                status,
                bid,
                fk_id_contractor: +contractor,
                created_at: data_venda,
                month,
                year
            }
        });
        return sales;
    }
}