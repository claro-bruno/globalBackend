
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IGetDataClient {
    month: string;
    year: number;
}

export class GetClientsProfitUseCase {
    async execute({ year, month }: IGetDataClient) {

        /**
         * "INPUT",
            "LABOUR_PAYROOL",
            "VAN_FUEL_OIL",
            "FUEL_OIL",
            "EQUIPMENT",
            "ADVERTISEMENT",
            "UNIFORM",
            "REPAIRS_MAINTENANCE",
            "OFFICE_EXPENSES",
            "MEALS",
            "CONTRACTOR",
            "CONTRACTOR_WORKERS",
            "CHEMICAL_CONSUMABLES",
            "INSURANCE_TAX",
            "EXTRAS",
            "GLOBAL",
            "MISC"
         */
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

        const result: any = [];
        // const clients = await prisma.clients.findMany({
        //     orderBy: [{ id: 'asc' }],
        //     where: {
        //         status: 'ACTIVE',
        //         NOT: 
        //         {
        //             name: 'Support'
        //         }

        //     }
        // });

        const clients: any = await prisma.$queryRaw`
        SELECT invoices.fk_id_client, clients.name FROM invoices
        INNER JOIN clients ON clients.id = invoices.fk_id_client
        WHERE invoices.month = ${month} AND invoices.year = ${year}
        GROUP BY invoices.fk_id_client, clients.name
        ORDER BY clients.name
         ;`;

        // const clients = await prisma.invoices.findMany({
        //     orderBy: [{ id: 'asc' }],
        // });
        const total_invs = await prisma.invoices.aggregate({
            _sum: {
                value: true,
                taxa: true
            },

            where: {
                month,
                year
            }
        });


        const total_invoices_by_clients = await prisma.invoices.groupBy({
            orderBy: [{ fk_id_client: 'asc' }],
            by: ['fk_id_client'],

            _sum: {
                value: true,
                taxa: true
            },
            where: {
                month,
                year
            }
        });


        // const total_supp: any = await prisma.$queryRaw`
        //    SELECT SUM(a.value*q.value_hour) AS total FROM jobs AS j
        //     INNER JOIN quarters AS q ON q.fk_id_job = j.id
        //     INNER JOIN appointments AS a ON a.fk_id_quarter = q.id
        //     WHERE (j.fk_id_client = 55 OR j.fk_id_client = 80 OR j.fk_id_client = 364)  AND q.month = ${month} AND q.year = ${year} AND q.status = 'REVISED'
        //     ;`;

        const total_exp: any = await prisma.$queryRaw`
           SELECT SUM(p.value) AS total FROM payments AS p
            WHERE p.month = ${month} AND p.year = ${year}
            ;`;




        const total_expenses_by_type: any = await prisma.payments.groupBy({
            by: ['category'],
            _sum: {
                value: true
            },
            where: {
                month,
                year
            }
        });


        // const resultt: any = {};
        // arrTypes.forEach((type: string) => {
        //     const payments_type = total_expenses_by_type.find(
        //         (info: any) => info.type === type
        //     );
        //     resultt[`${type}`] = typeof payments_type === 'undefined' || payments_type === null ? 0 : payments_type._sum.value as any;

        // });


        const total_labour_by_client: any = await prisma.$queryRaw`
            SELECT j.fk_id_client, SUM(a.value*q.value_hour) AS total FROM jobs AS j
                INNER JOIN quarters AS q ON q.fk_id_job = j.id
                INNER JOIN appointments AS a ON a.fk_id_quarter = q.id
                INNER JOIN clients AS c ON c.id = j.fk_id_client
                WHERE q.month = ${month} AND q.year = ${year} AND q.status = 'REVISED'
                GROUP BY j.fk_id_client
                ORDER BY j.fk_id_client ASC
         ;`

        const total_labour_by_client_1: any = await prisma.$queryRaw`
            SELECT j.fk_id_client, SUM(a.value*q.value_hour) AS total FROM jobs AS j
                INNER JOIN quarters AS q ON q.fk_id_job = j.id
                INNER JOIN appointments AS a ON a.fk_id_quarter = q.id
                INNER JOIN clients AS c ON c.id = j.fk_id_client
                WHERE q.month = ${month} AND q.year = ${year} AND q.status = 'REVISED' AND q.order = 1
                GROUP BY j.fk_id_client
                ORDER BY j.fk_id_client ASC
         ;`
        const total_labour_by_client_2: any = await prisma.$queryRaw`
            SELECT j.fk_id_client, SUM(a.value*q.value_hour) AS total FROM jobs AS j
                INNER JOIN quarters AS q ON q.fk_id_job = j.id
                INNER JOIN appointments AS a ON a.fk_id_quarter = q.id
                INNER JOIN clients AS c ON c.id = j.fk_id_client
                WHERE q.month = ${month} AND q.year = ${year} AND q.status = 'REVISED' AND q.order = 2
                GROUP BY j.fk_id_client
                ORDER BY j.fk_id_client ASC
         ;`


        const total_labour_total_total: any = await prisma.$queryRaw`
            SELECT SUM(a.value*q.value_hour) AS total, SUM(a.value) AS total_horas FROM jobs AS j
                INNER JOIN quarters AS q ON q.fk_id_job = j.id
                INNER JOIN appointments AS a ON a.fk_id_quarter = q.id
                INNER JOIN clients AS c ON c.id = j.fk_id_client
                WHERE q.month = ${month} AND q.year = ${year} AND q.status = 'REVISED'
        `
        const total_labour_total_total_1: any = await prisma.$queryRaw`
            SELECT SUM(a.value*q.value_hour) AS total  FROM jobs AS j
                INNER JOIN quarters AS q ON q.fk_id_job = j.id
                INNER JOIN appointments AS a ON a.fk_id_quarter = q.id
                INNER JOIN clients AS c ON c.id = j.fk_id_client
                WHERE q.month = ${month} AND q.year = ${year} AND q.status = 'REVISED' AND q.order = 1
        `

        const total_labour_total_total_2: any = await prisma.$queryRaw`
            SELECT SUM(a.value*q.value_hour) AS total FROM jobs AS j
                INNER JOIN quarters AS q ON q.fk_id_job = j.id
                INNER JOIN appointments AS a ON a.fk_id_quarter = q.id
                INNER JOIN clients AS c ON c.id = j.fk_id_client
                WHERE q.month = ${month} AND q.year = ${year} AND q.status = 'REVISED' AND q.order = 2
        `


        const total_labour_total: any = await prisma.$queryRaw`
            SELECT SUM(a.value*q.value_hour) AS total, SUM(a.value) AS total_horas FROM jobs AS j
                INNER JOIN quarters AS q ON q.fk_id_job = j.id
                INNER JOIN appointments AS a ON a.fk_id_quarter = q.id
                INNER JOIN clients AS c ON c.id = j.fk_id_client
                WHERE q.month = ${month} AND q.year = ${year} AND q.status = 'REVISED' AND j.fk_id_client != 55 AND j.fk_id_client != 80 AND j.fk_id_client != 364
        `
        const total_labour_1_grouped: any = await prisma.$queryRaw`
            SELECT SUM(a.value*q.value_hour) AS total, SUM(a.value) AS total_horas FROM jobs AS j
                INNER JOIN quarters AS q ON q.fk_id_job = j.id
                INNER JOIN appointments AS a ON a.fk_id_quarter = q.id
                INNER JOIN clients AS c ON c.id = j.fk_id_client
                WHERE q.month = ${month} AND q.order = 1 AND q.year = ${year} AND q.status = 'REVISED' AND j.fk_id_client != 55 AND j.fk_id_client != 80 AND j.fk_id_client != 364
        `

        const total_labour_2_grouped: any = await prisma.$queryRaw`
            SELECT SUM(a.value*q.value_hour) AS total, SUM(a.value) AS total_horas FROM jobs AS j
                INNER JOIN quarters AS q ON q.fk_id_job = j.id
                INNER JOIN appointments AS a ON a.fk_id_quarter = q.id
                INNER JOIN clients AS c ON c.id = j.fk_id_client
                WHERE q.month = ${month} AND q.year = ${year} AND q.order = 2 AND q.status = 'REVISED' AND j.fk_id_client != 55 AND j.fk_id_client != 80 AND j.fk_id_client != 364
        `




        const total_support_grouped_total: any = await prisma.$queryRaw`
            SELECT j.fk_id_client, SUM(a.value*q.value_hour) AS total FROM jobs AS j
                INNER JOIN quarters AS q ON q.fk_id_job = j.id
                INNER JOIN appointments AS a ON a.fk_id_quarter = q.id
                INNER JOIN clients AS c ON c.id = j.fk_id_client
                WHERE q.month = ${month} AND q.year = ${year} AND q.status = 'REVISED' AND (j.fk_id_client = 55 OR j.fk_id_client = 80 OR j.fk_id_client = 364)
                GROUP BY j.fk_id_client
        `




        const total_support_grouped_1: any = await prisma.$queryRaw`
            SELECT j.fk_id_client, SUM(a.value*q.value_hour) AS total FROM jobs AS j
                INNER JOIN quarters AS q ON q.fk_id_job = j.id
                INNER JOIN appointments AS a ON a.fk_id_quarter = q.id
                INNER JOIN clients AS c ON c.id = j.fk_id_client
                WHERE q.month = ${month} AND q.year = ${year} AND q.order = 1 AND q.status = 'REVISED' AND (j.fk_id_client = 55 OR j.fk_id_client = 80 OR j.fk_id_client = 364)
                GROUP BY j.fk_id_client
        `


        const total_support_grouped_2: any = await prisma.$queryRaw`
            SELECT j.fk_id_client,SUM(a.value*q.value_hour) AS total FROM jobs AS j
                INNER JOIN quarters AS q ON q.fk_id_job = j.id
                INNER JOIN appointments AS a ON a.fk_id_quarter = q.id
                INNER JOIN clients AS c ON c.id = j.fk_id_client
                WHERE q.month = ${month} AND q.year = ${year} AND q.order = 2 AND q.status = 'REVISED' AND (j.fk_id_client = 55 OR j.fk_id_client = 80 OR j.fk_id_client = 364)
                GROUP BY j.fk_id_client
        `




        let total_support = total_support_grouped_total.length > 0 ? +total_support_grouped_total[0]?.total + +total_support_grouped_total[1]?.total + +total_support_grouped_total[2]?.total : 0;
        let total_support_1 = total_support_grouped_1.length > 0 ? +total_support_grouped_1[0]?.total + +total_support_grouped_1[1]?.total + +total_support_grouped_1[2]?.total : 0;

        const total_support_global_1 = total_support_grouped_1.length > 0 ? +total_support_grouped_1[0]?.total : 0;
        const total_support_global_2 = total_support_grouped_2.length > 0 ? +total_support_grouped_2[0]?.total : 0;
        const total_support_comissoes_1 = total_support_grouped_1.length > 0 ? +total_support_grouped_1[1]?.total : 0;
        const total_support_comissoes_2 = total_support_grouped_2.length > 0 ? +total_support_grouped_2[1]?.total : 0;
        const total_support_office_1 = total_support_grouped_1.length > 0 ? +total_support_grouped_1[2]?.total : 0;
        const total_support_office_2 = total_support_grouped_2.length > 0 ? +total_support_grouped_2[2]?.total : 0;
        let total_support_2 = total_support_grouped_2.length > 0 ? +total_support_grouped_2[0]?.total + +total_support_grouped_2[1]?.total + +total_support_grouped_2[2]?.total : 0;

        let total_labour = total_labour_total ? total_labour_total[0]?.total : 0;
        let total_labour_1 = total_labour_1_grouped ? total_labour_1_grouped[0]?.total : 0;
        let total_labour_2 = total_labour_2_grouped ? total_labour_2_grouped[0]?.total : 0;
        let total_labour_1_all = total_labour_total_total_1 ? total_labour_total_total_1[0]?.total : 0;
        let total_labour_2_all = total_labour_total_total_2 ? total_labour_total_total_2[0]?.total : 0;

        // let total_horas = total_labour_total ? total_labour_total[0]?.total_horas : 0;
        // let total_horas_1 = total_labour_1_grouped ? total_labour_1_grouped[0]?.total_horas : 0;
        // let total_horas_2 = total_labour_2_grouped ? total_labour_2_grouped[0]?.total_horas : 0;

        let total_pago = total_labour_total_total ? total_labour_total_total[0]?.total : 0;
        let total_horas = total_labour_total_total ? total_labour_total_total[0]?.total_horas : 0;
        let custo_hora = total_horas > 0 && total_pago > 0 ? +total_pago / +total_horas : 0;


        // const total_despesas = Number(total_expenses) + Number(total_support);
        const total_expenses = total_exp[0].total === null ? 0 : +total_exp[0].total;


        const total_invoices_values = total_invs._sum.value == null ? 0 : +total_invs._sum.value;
        const total_invoices_taxas = total_invs._sum.taxa == null ? 0 : +total_invs._sum.taxa;
        const total_invoices = total_invs._sum.value == null ? 0 : +total_invoices_values + +total_invoices_taxas;
        // resultt[`SUPPORT`] = total_support;
        // resultt[`TOTAL_EXPENSES`] = total_despesas;
        // resultt[`TOTAL_INVOICES`] = total_invoices;
        let total_profit_without_expenses = +total_invoices - (+total_labour + +total_support);
        let total_profit_with_expenses = +total_invoices - (+total_labour + +total_support + +total_expenses);
        let real_profit_percentage = total_profit_with_expenses / total_invoices;


        const result_expenses: any = [];

        total_expenses_by_type.forEach((info: any) => {
            const inf: any = {};
            inf.category = info?.category;
            inf.value = info?._sum?.value;
            result_expenses.push(inf);
        })



        let aux = 0;
        if (clients.length > 0) {
            clients.forEach((client: any) => {
                const info: any = {};
                const invoice_info = total_invoices_by_clients.find(
                    (information: any) => information.fk_id_client === client.fk_id_client
                );


                const labour_info = total_labour_by_client.find(
                    (information: any) => information.fk_id_client === client.fk_id_client
                );

                const labour_info_1 = total_labour_by_client_1.find(
                    (information: any) => information.fk_id_client === client.fk_id_client
                );

                const labour_info_2 = total_labour_by_client_2.find(
                    (information: any) => information.fk_id_client === client.fk_id_client
                );



                if (invoice_info) {
                    info.taxa = invoice_info._sum.taxa != null ? invoice_info._sum.taxa : 0;
                    info.amount = invoice_info._sum.value != null ? invoice_info._sum.value + info.taxa : 0;
                    info.total_labour = labour_info ? labour_info?.total : 0;
                    info.total_labour = labour_info ? labour_info?.total : 0;
                    info.total_labour_1 = labour_info_1 ? labour_info_1?.total : 0;
                    info.total_labour_2 = labour_info_2 ? labour_info_2?.total : 0;

                    // info.ganho = invoice_info._sum.value != null && total_invoices > 0 ? invoice_info._sum.value / total_invoices : 0;
                    // info.expensive_value = info.ganho != null && total_despesas > 0 ? info.ganho * total_despesas : 0;
                    // info.expensive_value = total_despesas > 0 ? total_despesas / (total_invoices * info.amount) : 0;
                    // info.expensive_value = total_despesas > 0 ? total_despesas / total_invoices * info.amount : 0;
                    info.ganho = invoice_info._sum.value != null && total_invoices > 0 ? info.total_labour / info.amount : 0;
                    // info.ganho = invoice_info._sum.value != null && total_invoices > 0 ? total_despesas / invoice_info._sum.value : 0;

                    // info.profit = Number(Number(info.amount) - Number(info.expensive_value) - Number(info.total_labour));
                    info.profit = Number(Number(info.amount) - Number(info.total_labour));
                    info.profit_perc = invoice_info._sum.value != null && total_invoices > 0 ? info.profit / info.amount : 0;
                    // total_amount += +info.amount
                    // total_ganho += +info.ganho
                    // total_expensive += +info.expensive_value
                    // console.log(info)
                }
                // total_labour += +info.total_labour
                info.name = client.name;
                info.fk_id_client = client.fk_id_client;
                result.push(info);
            })
        }




        return {
            total_support,
            total_support_1,
            total_support_2,
            total_support_global_1,
            total_support_global_2,
            total_support_comissoes_1,
            total_support_comissoes_2,
            total_support_office_1,
            total_support_office_2,
            total_labour,
            total_labour_1,
            total_labour_1_all,
            total_labour_2,
            total_labour_2_all,
            total_pago,
            total_horas,
            custo_hora,
            total_profit_without_expenses,
            total_profit_with_expenses,
            real_profit_percentage,
            total_invoices,
            total_expenses,
            result_expenses,
            clients: result

        };

    }
}