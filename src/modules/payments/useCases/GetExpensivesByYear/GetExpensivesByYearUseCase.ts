import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IGetExpensives {
    year: number;
}

export class GetExpensivesByMonthUseCase {
    async execute({ year }: IGetExpensives) {
        const arrTypes: any = [
            "Advertising / Promotional",
            "Bank Charges",
            "Car Wash",
            "Dues  & Subscriptions",
            "Fuel & Oil",
            "Insurance",
            "Insurance Liabilites",
            "Interest Paid",
            "Legal & Professional Fees",
            "total Payroll Expenses",
            "Insurance Workers Compensation",
            "Legal & Professional Fees",
            "Meals",
            "Office Expences",
            "Other Business Expenses",
            "Payroll Expenses",
            "Taxes",
            "Wages",
            "Payroll Tax Federal",
            "Payroll Tax State",
            "Payroll Tax Unemployment",
            "Phone Expenses",
            "Quick Books Payment Fees",
            "Rent or Lease of Buildings",
            "Repairs & Maintenance",
            "Software & General Administrative Expenses",
            "Taxes and Licences",
            "Travel",
            "Uniform",
            "Utilites",
            "Extra",
            "Supplies & Materials - COGS"
        ];


        const total_exp: any = await prisma.$queryRaw`
           SELECT SUM(p.value) AS total FROM payments AS p
            WHERE p.year = ${year}
            ;`;



        const result = await prisma.payments.groupBy({
            by: ['month', 'category'],
            where: {
                year
            },
            _sum: {
                value: true,
            },
        });


        console.log(result, 'result')










        return {
            total: total_exp,
            categories: result,
        };




    }
}