import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IGetExpensives {
    year: number;
}

function getMonthFromString(mon: string, year: number) {
    var d = Date.parse(mon + "1, " + year);
    if (!isNaN(d)) {
        return new Date(d).getMonth();
    }
    return -1;
}

export class GetExpensivesByMonthUseCase {
    async execute({ year }: IGetExpensives) {

        const MONTHS = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ]
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


        const totals_1: any = await prisma.$queryRaw`
           SELECT SUM(p.value) AS total, p.category FROM payments AS p
            WHERE year = ${year} AND month = 'January'
            GROUP BY p.category
            ;`;


        // const total_1: any = await prisma.$queryRaw`
        //    SELECT SUM(p.value) AS total, p.category FROM payments AS p
        //     WHERE EXTRACT(YEAR FROM date_at) = ${year} AND p.month = 1

        //     ;`;

        const totals_2: any = await prisma.$queryRaw`
           SELECT SUM(p.value) AS total, p.category FROM payments AS p
            WHERE year = ${year} AND month = 'February'
            GROUP BY p.category
            ;`;

        // const total_2: any = await prisma.$queryRaw`
        //    SELECT SUM(p.value) AS total, p.category FROM payments AS p
        //     WHERE EXTRACT(YEAR FROM date_at) = ${year} AND p.month = 2

        //     ;`;

        const totals_3: any = await prisma.$queryRaw`
           SELECT SUM(p.value) AS total, p.category FROM payments AS p
            WHERE year = ${year} AND month = 'March'
            GROUP BY p.category
            ;`;

        // const total_3: any = await prisma.$queryRaw`
        //    SELECT SUM(p.value) AS total, p.category FROM payments AS p
        //     WHERE EXTRACT(YEAR FROM date_at) = ${year} AND p.month = 3

        //     ;`;

        const totals_4: any = await prisma.$queryRaw`
           SELECT SUM(p.value) AS total, p.category FROM payments AS p
            WHERE year = ${year} AND month = 'April'
            GROUP BY p.category
            ;`;
        // const total_4: any = await prisma.$queryRaw`
        //    SELECT SUM(p.value) AS total, p.category FROM payments AS p
        //     WHERE EXTRACT(YEAR FROM date_at) = ${year} AND p.month = 4

        //     ;`;
        const totals_5: any = await prisma.$queryRaw`
           SELECT SUM(p.value) AS total, p.category FROM payments AS p
            WHERE year = ${year} AND month = 'May'
            GROUP BY p.category
            ;`;

        // const total_5: any = await prisma.$queryRaw`
        //    SELECT SUM(p.value) AS total, p.category FROM payments AS p
        //     WHERE EXTRACT(YEAR FROM date_at) = ${year} AND p.month = 5

        //     ;`;
        const totals_6: any = await prisma.$queryRaw`
            SELECT SUM(p.value) AS total, p.category FROM payments AS p
                WHERE year = ${year} AND month = 'June'
                GROUP BY p.category
                ;`;

        // const total_6: any = await prisma.$queryRaw`
        //    SELECT SUM(p.value) AS total, p.category FROM payments AS p
        //     WHERE EXTRACT(YEAR FROM date_at) = ${year} AND p.month = 6

        //     ;`;

        const totals_7: any = await prisma.$queryRaw`
            SELECT SUM(p.value) AS total, p.category FROM payments AS p
                WHERE year = ${year} AND month = 'July'
                GROUP BY p.category
                ;`;
        // const total_7: any = await prisma.$queryRaw`
        //    SELECT SUM(p.value) AS total, p.category FROM payments AS p
        //     WHERE EXTRACT(YEAR FROM date_at) = ${year} AND p.month = 7

        //     ;`;
        const totals_8: any = await prisma.$queryRaw`
            SELECT SUM(p.value) AS total, p.category FROM payments AS p
                WHERE year = ${year} AND month = 'August'
                GROUP BY p.category
                ;`;
        // const total_8: any = await prisma.$queryRaw`
        //    SELECT SUM(p.value) AS total, p.category FROM payments AS p
        //     WHERE EXTRACT(YEAR FROM date_at) = ${year} AND p.month = 8

        //     ;`;
        const totals_9: any = await prisma.$queryRaw`
            SELECT SUM(p.value) AS total, p.category FROM payments AS p
                WHERE year = ${year} AND month = 'September'
                GROUP BY p.category
                ;`;
        // const total_9: any = await prisma.$queryRaw`
        //    SELECT SUM(p.value) AS total, p.category FROM payments AS p
        //     WHERE EXTRACT(YEAR FROM date_at) = ${year} AND p.month = 9

        //     ;`;
        const totals_10: any = await prisma.$queryRaw`
            SELECT SUM(p.value) AS total, p.category FROM payments AS p
                WHERE year = ${year} AND month = 'October'
                GROUP BY p.category
                ;`;
        // const total_10: any = await prisma.$queryRaw`
        //    SELECT SUM(p.value) AS total, p.category FROM payments AS p
        //     WHERE EXTRACT(YEAR FROM date_at) = ${year} AND p.month = 9

        //     ;`;
        const totals_11: any = await prisma.$queryRaw`
            SELECT SUM(p.value) AS total, p.category FROM payments AS p
                WHERE year = ${year} AND month = 'November'
                GROUP BY p.category
                ;`;
        // const total_11: any = await prisma.$queryRaw`
        //    SELECT SUM(p.value) AS total, p.category FROM payments AS p
        //     WHERE EXTRACT(YEAR FROM date_at) = ${year} AND p.month = 11

        //     ;`;
        const totals_12: any = await prisma.$queryRaw`
            SELECT SUM(p.value) AS total, p.category FROM payments AS p
                WHERE year = ${year} AND month = 'December'
                GROUP BY p.category
                ;`;

        // const total_12: any = await prisma.$queryRaw`
        //    SELECT SUM(p.value) AS total, p.category FROM payments AS p
        //     WHERE EXTRACT(YEAR FROM date_at) = ${year} AND p.month = 12

        //     ;`;

        const totals_month: any = await prisma.$queryRaw`
           SELECT SUM(p.value) AS total, p.month FROM payments AS p
            WHERE year = ${year}
            GROUP BY p.month
            ;`;

        const totals_category: any = await prisma.$queryRaw`
           SELECT SUM(p.value) AS total, p.category FROM payments AS p
            WHERE year = ${year}
            GROUP BY p.category
            ;`;

        const total: any = await prisma.$queryRaw`
           SELECT SUM(p.value) AS total FROM payments AS p
            WHERE year = ${year}
            ;`;

        const total_months_: any = []
        total_months_.push({
            month: '',
            total: 0,
            month_number: 0
        });
        total_months_.push({
            month: '',
            total: 0,
            month_number: 0
        });
        MONTHS.forEach((info: any) => {



            const total = totals_month.find((item: any) => item.month === info);
            const month_number = getMonthFromString(info, year) + 1;
            total_months_.push({
                month: info,
                total: total ? total.total : 0,
                month_number: month_number
            });


        })
        total_months_.sort((a: any, b: any) => a.month_number - b.month_number);
        const result: any = []
        arrTypes.forEach((type: any) => {
            result.push({
                total: totals_category.find((item: any) => item.category === type)?.total || 0,
                category: type,
                january: totals_1.find((item: any) => item.category === type)?.total || 0,
                february: totals_2.find((item: any) => item.category === type)?.total || 0,
                march: totals_3.find((item: any) => item.category === type)?.total || 0,
                april: totals_4.find((item: any) => item.category === type)?.total || 0,
                may: totals_5.find((item: any) => item.category === type)?.total || 0,
                june: totals_6.find((item: any) => item.category === type)?.total || 0,
                july: totals_7.find((item: any) => item.category === type)?.total || 0,
                august: totals_8.find((item: any) => item.category === type)?.total || 0,
                september: totals_9.find((item: any) => item.category === type)?.total || 0,
                october: totals_10.find((item: any) => item.category === type)?.total || 0,
                november: totals_11.find((item: any) => item.category === type)?.total || 0,
                december: totals_12.find((item: any) => item.category === type)?.total || 0
            })
        })
        result.sort((a: any, b: any) => a.category - b.category);
        return {
            total: total,
            totals_month: total_months_,
            totals_category: totals_category,
            result
        }

    }
};





