import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";
import { hash } from "bcrypt";

interface ISales {
    notes: string;
    id: number;

}

function toMonthName(monthNumber: number) {
    const date = new Date();
    date.setMonth(monthNumber);

    return date.toLocaleString("en-US", {
        month: "long"
    });
}

export class UpdateSalesNotesUseCase {
    async execute({ notes, id }: ISales): Promise<any> {


        const salesExist = await prisma.sales.findFirst({
            where: {
                id,
            }
        });



        if (!salesExist) {
            throw new AppError('Sales does not exists', 400)
        }



        const sales = await prisma.sales.update({

            where: {
                id,
            },
            data: {
                notes,
            }
        });
        return sales;
    }
}