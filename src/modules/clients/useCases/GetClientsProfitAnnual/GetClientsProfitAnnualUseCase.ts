
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IGetDataClient {
    year: number;
}

export class GetClientsProfitAnnualUseCase {
    async execute({ year }: IGetDataClient) {

        const result_total: any = {};
        let result: any = [{ month: 'January', order: 1 },
        { month: 'February', order: 2 },
        { month: 'March', order: 3 },
        { month: 'April', order: 4 },
        { month: 'May', order: 5 },
        { month: 'June', order: 6 },
        { month: 'July', order: 7 },
        { month: 'August', order: 8 },
        { month: 'September', order: 9 },
        { month: 'October', order: 10 },
        { month: 'November', order: 11 },
        { month: 'December', order: 12 }]


        const arrTypes: any = [
            "Advertising / Promotional",
            "Bank Charges",
            "Car Wash",
            "Dues  & Subscriptions",
            "Fuel & Oil",
            "Insurance",
            "Insurance Liabilites",
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
            "Utilites"
        ];



        const total_invoices_by_month = await prisma.invoices.groupBy({
            by: ['month'],

            _sum: {
                value: true,
                taxa: true,
                total: true,
                total_pago: true
            },
            where: {
                year
            }
        });

        const total_invoices_by_year = await prisma.invoices.aggregate({
            _sum: {
                value: true,
                taxa: true,
                total: true,
                total_pago: true
            },
            where: {
                year
            }
        });


        const total_expenses_by_month: any = await prisma.payments.groupBy({
            by: ['month'],
            _sum: {
                value: true
            },
            where: {
                year
            }
        });


        const total_expenses_by_year: any = await prisma.payments.aggregate({
            _sum: {
                value: true
            },
            where: {
                year
            }
        });

        //aqui ainda
        const total_expenses_by_category: any = await prisma.payments.groupBy({
            by: ['category'],
            _sum: {
                value: true
            },
            where: {
                year
            }
        });


        const total_labour_by_year: any = await prisma.$queryRaw`
            SELECT SUM(a.value*q.value_hour) AS total, SUM(a.value) AS total_horas FROM jobs AS j
                INNER JOIN quarters AS q ON q.fk_id_job = j.id
                INNER JOIN appointments AS a ON a.fk_id_quarter = q.id
                INNER JOIN clients AS c ON c.id = j.fk_id_client
                WHERE q.year = ${year} AND q.status = 'REVISED'
         ;`

        const total_labour_by_year_1: any = await prisma.$queryRaw`
            SELECT SUM(a.value*q.value_hour) AS total, SUM(a.value) AS total_horas FROM jobs AS j
                INNER JOIN quarters AS q ON q.fk_id_job = j.id
                INNER JOIN appointments AS a ON a.fk_id_quarter = q.id
                INNER JOIN clients AS c ON c.id = j.fk_id_client
                WHERE q.year = ${year} AND q.status = 'REVISED' AND q.order = 1
         ;`

        const total_labour_by_year_2: any = await prisma.$queryRaw`
            SELECT SUM(a.value*q.value_hour) AS total, SUM(a.value) AS total_horas FROM jobs AS j
                INNER JOIN quarters AS q ON q.fk_id_job = j.id
                INNER JOIN appointments AS a ON a.fk_id_quarter = q.id
                INNER JOIN clients AS c ON c.id = j.fk_id_client
                WHERE q.year = ${year} AND q.status = 'REVISED' AND q.order = 2
         ;`

        const total_labour_by_month: any = await prisma.$queryRaw`
            SELECT SUM(a.value*q.value_hour) AS total, q.month, SUM(a.value) AS total_horas FROM jobs AS j
                INNER JOIN quarters AS q ON q.fk_id_job = j.id
                INNER JOIN appointments AS a ON a.fk_id_quarter = q.id
                INNER JOIN clients AS c ON c.id = j.fk_id_client
                WHERE q.year = ${year} AND q.status = 'REVISED'
                GROUP BY q.month
                ORDER BY q.month ASC
         ;`

        const total_labour_by_month_1: any = await prisma.$queryRaw`
            SELECT SUM(a.value*q.value_hour) AS total, q.month, SUM(a.value) AS total_horas FROM jobs AS j
                INNER JOIN quarters AS q ON q.fk_id_job = j.id
                INNER JOIN appointments AS a ON a.fk_id_quarter = q.id
                INNER JOIN clients AS c ON c.id = j.fk_id_client
                WHERE q.year = ${year} AND q.status = 'REVISED' AND q.order = 1
                GROUP BY q.month
                ORDER BY q.month ASC
         ;`

        const total_labour_by_month_2: any = await prisma.$queryRaw`
            SELECT SUM(a.value*q.value_hour) AS total, q.month, SUM(a.value) AS total_horas FROM jobs AS j
                INNER JOIN quarters AS q ON q.fk_id_job = j.id
                INNER JOIN appointments AS a ON a.fk_id_quarter = q.id
                INNER JOIN clients AS c ON c.id = j.fk_id_client
                WHERE q.year = ${year} AND q.status = 'REVISED' AND q.order = 2
                GROUP BY q.month
                ORDER BY q.month ASC
         ;`

        const total_labour_total_annual: any = await prisma.$queryRaw`
            SELECT SUM(a.value*q.value_hour) AS total, SUM(a.value) AS total_horas FROM jobs AS j
                INNER JOIN quarters AS q ON q.fk_id_job = j.id
                INNER JOIN appointments AS a ON a.fk_id_quarter = q.id
                INNER JOIN clients AS c ON c.id = j.fk_id_client
                WHERE q.year = ${year} AND q.status = 'REVISED' AND j.fk_id_client != 55 AND j.fk_id_client != 80 AND j.fk_id_client != 364
        `

        const total_labour_total_annual_1: any = await prisma.$queryRaw`
            SELECT SUM(a.value*q.value_hour) AS total, SUM(a.value) AS total_horas FROM jobs AS j
                INNER JOIN quarters AS q ON q.fk_id_job = j.id
                INNER JOIN appointments AS a ON a.fk_id_quarter = q.id
                INNER JOIN clients AS c ON c.id = j.fk_id_client
                WHERE q.order = 1 AND q.year = ${year} AND q.status = 'REVISED' AND j.fk_id_client != 55 AND j.fk_id_client != 80 AND j.fk_id_client != 364
        `

        const total_labour_total_annual_2: any = await prisma.$queryRaw`
            SELECT SUM(a.value*q.value_hour) AS total, SUM(a.value) AS total_horas FROM jobs AS j
                INNER JOIN quarters AS q ON q.fk_id_job = j.id
                INNER JOIN appointments AS a ON a.fk_id_quarter = q.id
                INNER JOIN clients AS c ON c.id = j.fk_id_client
                WHERE q.order = 2 AND q.year = ${year} AND q.status = 'REVISED' AND j.fk_id_client != 55 AND j.fk_id_client != 80 AND j.fk_id_client != 364
        `


        const total_labour_total: any = await prisma.$queryRaw`
            SELECT SUM(a.value*q.value_hour) AS total, SUM(a.value) AS total_horas, q.month FROM jobs AS j
                INNER JOIN quarters AS q ON q.fk_id_job = j.id
                INNER JOIN appointments AS a ON a.fk_id_quarter = q.id
                INNER JOIN clients AS c ON c.id = j.fk_id_client
                WHERE q.year = ${year} AND q.status = 'REVISED' AND j.fk_id_client != 55 AND j.fk_id_client != 80 AND j.fk_id_client != 364
                GROUP BY q.month
        `
        const total_labour_1_grouped: any = await prisma.$queryRaw`
            SELECT SUM(a.value*q.value_hour) AS total, SUM(a.value) AS total_horas, q.month FROM jobs AS j
                INNER JOIN quarters AS q ON q.fk_id_job = j.id
                INNER JOIN appointments AS a ON a.fk_id_quarter = q.id
                INNER JOIN clients AS c ON c.id = j.fk_id_client
                WHERE q.order = 1 AND q.year = ${year} AND q.status = 'REVISED' AND j.fk_id_client != 55 AND j.fk_id_client != 80 AND j.fk_id_client != 364
                GROUP BY q.month
        `

        const total_labour_2_grouped: any = await prisma.$queryRaw`
            SELECT SUM(a.value*q.value_hour) AS total, SUM(a.value) AS total_horas, q.month FROM jobs AS j
                INNER JOIN quarters AS q ON q.fk_id_job = j.id
                INNER JOIN appointments AS a ON a.fk_id_quarter = q.id
                INNER JOIN clients AS c ON c.id = j.fk_id_client
                WHERE q.year = ${year} AND q.order = 2 AND q.status = 'REVISED' AND j.fk_id_client != 55 AND j.fk_id_client != 80 AND j.fk_id_client != 364
                GROUP BY q.month
        `


        const total_support_grouped_total_annual: any = await prisma.$queryRaw`
            SELECT SUM(a.value*q.value_hour) AS total, SUM(a.value) AS total_horas FROM jobs AS j
                INNER JOIN quarters AS q ON q.fk_id_job = j.id
                INNER JOIN appointments AS a ON a.fk_id_quarter = q.id
                INNER JOIN clients AS c ON c.id = j.fk_id_client
                WHERE  q.year = ${year} AND q.status = 'REVISED' AND (j.fk_id_client = 55 OR j.fk_id_client = 80 OR j.fk_id_client = 364)
        `
        const total_support_grouped_total_annual_1: any = await prisma.$queryRaw`
            SELECT SUM(a.value*q.value_hour) AS total, SUM(a.value) AS total_horas FROM jobs AS j
                INNER JOIN quarters AS q ON q.fk_id_job = j.id
                INNER JOIN appointments AS a ON a.fk_id_quarter = q.id
                INNER JOIN clients AS c ON c.id = j.fk_id_client
                WHERE q.order = 1 AND q.year = ${year} AND q.status = 'REVISED' AND (j.fk_id_client = 55 OR j.fk_id_client = 80 OR j.fk_id_client = 364)
        `
        const total_support_grouped_total_annual_2: any = await prisma.$queryRaw`
            SELECT SUM(a.value*q.value_hour) AS total, SUM(a.value) AS total_horas FROM jobs AS j
                INNER JOIN quarters AS q ON q.fk_id_job = j.id
                INNER JOIN appointments AS a ON a.fk_id_quarter = q.id
                INNER JOIN clients AS c ON c.id = j.fk_id_client
                WHERE q.order = 2 AND q.year = ${year} AND q.status = 'REVISED' AND (j.fk_id_client = 55 OR j.fk_id_client = 80 OR j.fk_id_client = 364)
        `

        const total_support_grouped_total: any = await prisma.$queryRaw`
            SELECT SUM(a.value*q.value_hour) AS total, q.month FROM jobs AS j
                INNER JOIN quarters AS q ON q.fk_id_job = j.id
                INNER JOIN appointments AS a ON a.fk_id_quarter = q.id
                INNER JOIN clients AS c ON c.id = j.fk_id_client
                WHERE q.year = ${year} AND q.status = 'REVISED' AND (j.fk_id_client = 55 OR j.fk_id_client = 80 OR j.fk_id_client = 364)
                GROUP BY q.month
        `




        const total_support_grouped_1: any = await prisma.$queryRaw`
            SELECT SUM(a.value*q.value_hour) AS total, q.month FROM jobs AS j
                INNER JOIN quarters AS q ON q.fk_id_job = j.id
                INNER JOIN appointments AS a ON a.fk_id_quarter = q.id
                INNER JOIN clients AS c ON c.id = j.fk_id_client
                WHERE q.year = ${year} AND q.order = 1 AND q.status = 'REVISED' AND (j.fk_id_client = 55 OR j.fk_id_client = 80 OR j.fk_id_client = 364)
                GROUP BY q.month
        `


        const total_support_grouped_2: any = await prisma.$queryRaw`
            SELECT SUM(a.value*q.value_hour) AS total, q.month FROM jobs AS j
                INNER JOIN quarters AS q ON q.fk_id_job = j.id
                INNER JOIN appointments AS a ON a.fk_id_quarter = q.id
                INNER JOIN clients AS c ON c.id = j.fk_id_client
                WHERE q.year = ${year} AND q.order = 2 AND q.status = 'REVISED' AND (j.fk_id_client = 55 OR j.fk_id_client = 80 OR j.fk_id_client = 364)
                GROUP BY q.month
        `





        const total_value_invoices = total_invoices_by_year ? total_invoices_by_year?._sum?.value : 0;
        const total_taxas_invoices = total_invoices_by_year ? total_invoices_by_year?._sum?.taxa : 0;
        const total_invoices = total_invoices_by_year ? total_invoices_by_year?._sum?.total : 0;
        const total_pago_invoices = total_invoices_by_year ? total_invoices_by_year?._sum?.total_pago : 0;

        result_total.total_value_invoices = total_value_invoices;
        result_total.total_taxas_invoices = total_taxas_invoices;
        result_total.total_invoices = total_invoices;
        result_total.total_pago_invoices = total_pago_invoices;

        const total_expenses = total_expenses_by_year ? total_expenses_by_year?._sum?.value : 0;
        result_total.total_expenses = total_expenses;

        const total_labour = total_labour_by_year ? total_labour_by_year[0]?.total : 0;
        const total_horas = total_labour_by_year ? total_labour_by_year[0]?.total_horas : 0;
        const total_labour_1 = total_labour_by_year_1 ? total_labour_by_year_1[0]?.total : 0;
        const total_horas_1 = total_labour_by_year_1 ? total_labour_by_year_1[0]?.total_horas : 0;
        const total_labour_2 = total_labour_by_year_2 ? total_labour_by_year_2[0]?.total : 0;
        const total_horas_2 = total_labour_by_year_2 ? total_labour_by_year_2[0]?.total_horas : 0;

        result_total.total_labour = total_labour;
        result_total.total_horas = total_horas;
        result_total.total_labour_1 = total_labour_1;
        result_total.total_horas_1 = total_horas_1;
        result_total.total_labour_2 = total_labour_2;
        result_total.total_horas_2 = total_horas_2;

        const total_labour_without_support = total_labour_total_annual ? total_labour_total_annual[0]?.total : 0;
        const total_horas_without_support = total_labour_total_annual ? total_labour_total_annual[0]?.total_horas : 0;
        const total_labour_1_without_support = total_labour_total_annual_1 ? total_labour_total_annual_1[0]?.total : 0;
        const total_horas_1_without_support = total_labour_total_annual_1 ? total_labour_total_annual_1[0]?.total_horas : 0;
        const total_labour_2_without_support = total_labour_total_annual_2 ? total_labour_total_annual_2[0]?.total : 0;
        const total_horas_2_without_support = total_labour_total_annual_2 ? total_labour_total_annual_2[0]?.total_horas : 0;

        result_total.total_labour_without_support = total_labour_without_support;
        result_total.total_horas_without_support = total_horas_without_support;
        result_total.total_labour_1_without_support = total_labour_1_without_support;
        result_total.total_horas_1_without_support = total_horas_1_without_support;
        result_total.total_labour_2_without_support = total_labour_2_without_support;
        result_total.total_horas_2_without_support = total_horas_2_without_support;

        const total_support = total_support_grouped_total_annual ? total_support_grouped_total_annual[0]?.total : 0;
        const total_support_1 = total_support_grouped_total_annual_1 ? total_support_grouped_total_annual_1[0]?.total : 0;
        const total_support_2 = total_support_grouped_total_annual_2 ? total_support_grouped_total_annual_2[0]?.total : 0;

        result_total.total_support = total_support;
        result_total.total_support_1 = total_support_1;
        result_total.total_support_2 = total_support_2;

        result.forEach((info: any) => {

            const invoice_info = total_invoices_by_month.find(
                (information: any) => information.month === info.month
            );


            info.value_invoice = invoice_info ? invoice_info?._sum?.value : 0;
            info.taxa_invoice = invoice_info ? invoice_info?._sum?.taxa : 0;
            info.total_invoice = invoice_info ? invoice_info?._sum?.total : 0;
            info.total_pago_invoice = invoice_info ? invoice_info?._sum?.total_pago : 0;

            const expense_info = total_expenses_by_month.find(
                (information: any) => information.month === info.month
            );

            info.total_expense = expense_info ? expense_info?._sum?.value : 0;

            const labour_info = total_labour_by_month.find(
                (information: any) => information.month === info.month
            );

            info.total_labour = labour_info ? labour_info?.total : 0;

            const labour_info_1 = total_labour_by_month_1.find(
                (information: any) => information.month === info.month
            );
            const labour_info_2 = total_labour_by_month_2.find(
                (information: any) => information.month === info.month
            );

            info.total_labour_1 = labour_info_1 ? labour_info_1?.total : 0;
            info.total_labour_2 = labour_info_2 ? labour_info_2?.total : 0;

            const labour_info_without_support = total_labour_total.find(
                (information: any) => information.month === info.month
            );

            info.total_labour_without_support = labour_info_without_support ? labour_info_without_support?.total : 0;

            const labour_info_1_without_support = total_labour_1_grouped.find(
                (information: any) => information.month === info.month
            );

            const labour_info_2_without_support = total_labour_2_grouped.find(
                (information: any) => information.month === info.month
            );
            info.total_labour_1_without_support = labour_info_1_without_support ? labour_info_1_without_support?.total : 0;
            info.total_labour_2_without_support = labour_info_2_without_support ? labour_info_2_without_support?.total : 0;

            const support_info = total_support_grouped_total.find(
                (information: any) => information.month === info.month
            );

            info.total_support = support_info ? support_info?.total : 0;

            const support_info_1 = total_support_grouped_1.find(
                (information: any) => information.month === info.month
            );
            const support_info_2 = total_support_grouped_2.find(
                (information: any) => information.month === info.month
            );

            info.total_support_1 = support_info_1 ? support_info_1?.total : 0;
            info.total_support_2 = support_info_2 ? support_info_2?.total : 0;

            info.ganho = info.total_invoice > 0 ? info.total_labour / info.total_invoice : 0;
            info.profit = Number(Number(info.total_invoice) - Number(info.total_labour) - Number(info.total_expense));
            info.profit_perc = info.total_invoice > 0 ? info.profit / info.total_invoice : 0;
        })




        result = { ...result_total, result };



        return result;

    }
}