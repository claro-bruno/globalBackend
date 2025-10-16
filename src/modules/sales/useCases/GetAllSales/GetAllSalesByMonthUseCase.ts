
import { prisma } from "../../../../database/prismaClient";

interface IGetInvoices {
    month: string;
    year: number;
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

export class GetAllSalesByMonthUseCase {
    async execute() {




        const result = await prisma.salesTracker.findMany({
            orderBy: [{ created_at: 'desc' }],

            select: {
                id: true,
                contact: true,
                email: true,
                created_at: true,
                phone: true,
                region: true,
                status: true,
                bid: true,
                month: true,
                year: true,
                fk_id_contractor: true,
                contractor: {
                    select: {
                        first_name: true,
                        last_name: true,
                    }
                }

            }
        });






        return result;


    }
}