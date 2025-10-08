
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IUpdateExpensives {

    value: number;
    year: number;
    month: string;
    description?: string;
    category: string;
    id: number;
}






export class UpdateExpensivesUseCase {
    async execute({ month, year, value, category, description, id }: IUpdateExpensives) {










        if (value > 0) {


            await prisma.payments.update({
                where: {
                    id: +id,
                },
                data: {
                    value,
                    month,
                    year: +year,
                    category,
                    description
                }
            });


            return 'Ok';
        }
    }
}