import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IGetExpensives {
    month: string;
    year: number;
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



export class GetExpensivesByMonthUseCase {

    async execute({ year, month }: IGetExpensives) {

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
            "Extra"
        ];

        const total_exp: any = await prisma.$queryRaw`
           SELECT SUM(p.value) AS total FROM payments AS p
            WHERE p.month = ${month} AND p.year = ${year}
            ;`;


        const result = await prisma.payments.findMany({
            orderBy: [{ id: 'asc' }],
            where: {
                month,
                year
            }
        });









        // const resTypes = await prisma.payments.groupBy({
        //     by: ['type'],
        //     _sum: {
        //         value: true
        //     },
        //     where: {
        //         year,
        //         month
        //     }
        // });

        // const resultt: any = {};
        // arrTypes.forEach((type: string) => {
        //     const payments_type = resTypes.find(
        //         (info: any) => info.type === type
        //     );
        //     resultt[`${type}`] = typeof payments_type === 'undefined' || payments_type === null ? 0 : payments_type._sum.value as any;

        // });




        return {
            total_expenses: total_exp[0].total || 0,
            monthReports: result,
        };




    }
}