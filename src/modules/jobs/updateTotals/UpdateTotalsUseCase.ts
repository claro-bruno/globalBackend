
import { prisma } from "../../../database/prismaClient";
import { AppError } from "../../../middlewares/AppError";



interface ITotal {
    day: number;
    valor: number;
    month: string;
    year: number;
}


export class UpdateTotalsUseCase {
    async execute({
        day,
        valor,
        month,
        year
    }: ITotal) {
        const existTotal = await prisma.totals.findFirst({
            where: {
                day
            }
        });

        if (!existTotal) {
            throw new AppError("Total does not exist");
        }

        await prisma.totals.updateMany({
            where: {
                day,
                month,
                year
            },
            data: {
                valor: +valor,
            }
        });
        return 'Ok';
    }
}