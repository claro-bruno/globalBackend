import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface ICreateExpensive {
    month: string;
    year: number;
    value: number;
    description?: string;
    category: string;
}

function getMonthFromString(mon: string, year: number) {
    const d = Date.parse(mon + "1, " + year);
    if (!isNaN(d)) {
        return new Date(d).getMonth() - 1;
    }
    return -1;
}

function toMonthName(monthNumber: number) {
    const date = new Date();
    date.setMonth(monthNumber);

    return date.toLocaleString("en-US", {
        month: "long"
    });
}

export class CreateExpensivesUseCase {
    async execute({ month, year, value, category, description }: ICreateExpensive) {














        console.log(month, year, value, category);

        await prisma.payments.create({
            data: {
                value: +value,
                year: +year,
                month: String(month),
                category: String(category)
            }
        });

        return 'Ok';
    }
}