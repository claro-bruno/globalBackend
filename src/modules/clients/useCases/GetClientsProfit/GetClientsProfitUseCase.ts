
import { prisma} from "../../../../database/prismaClient";
import { AppError} from "../../../../middlewares/AppError";

interface IGetDataClient {
    month: string;
    year: number;
}

export class GetClientsProfitUseCase {
    async execute({ year, month}: IGetDataClient) {

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
            "INPUT",
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
            "MONEY BACK"
            // "GLOBAL",
            // "MISC"
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
                value: true
            },

            where: {
                month,
                year
            }
        });

        
        const total_invoices_by_clients = await prisma.invoices.groupBy({
            orderBy: [{ fk_id_client: 'asc' }],
            by: ['fk_id_client','payed_for'],
            
            _sum: {
                value: true
            },
            where: {
                month,
                year
            }
        });

        const total_supp: any = await prisma.$queryRaw`
           SELECT SUM(a.value*q.value_hour) AS total FROM jobs AS j
            INNER JOIN quarters AS q ON q.fk_id_job = j.id
            INNER JOIN appointments AS a ON a.fk_id_quarter = q.id
            WHERE j.fk_id_client = 55 AND q.month = ${month} AND q.year = ${year}
            ;`;
        
        const total_exp: any = await prisma.$queryRaw`
           SELECT SUM(p.value) AS total FROM payments AS p
            WHERE p.month = ${month} AND p.year = ${year} AND p.type != 'CONTRACTOR_WORKERS' AND p.type != 'INPUT' AND p.type != 'GLOBAL' AND p.type != 'MISC'
            ;`;

        

        const total_expenses_by_type: any = await prisma.payments.groupBy({
            by: ['type'],
            _sum: {
                value: true
            },
            where: {
                month,
                year
            }
        });

        const resultt: any = {};
        arrTypes.forEach((type: string) => {
            const payments_type = total_expenses_by_type.find(
                (info: any) => info.type === type
              );
              resultt[`${type}`] = typeof payments_type === 'undefined' || payments_type === null ? 0 : payments_type._sum.value as any;

        });


        const total_labour_by_client: any = await prisma.$queryRaw`
            SELECT j.fk_id_client, SUM(a.value*q.value_hour) AS total FROM jobs AS j
                INNER JOIN quarters AS q ON q.fk_id_job = j.id
                INNER JOIN appointments AS a ON a.fk_id_quarter = q.id
                INNER JOIN clients AS c ON c.id = j.fk_id_client
                WHERE q.month = ${month} AND q.year = ${year} AND q.status = 'REVISED'
                GROUP BY j.fk_id_client
                ORDER BY j.fk_id_client ASC
         ;`
 

        const total_expenses = total_exp[0]?.total === null ? 0 : total_exp[0]?.total;
        const total_support = total_supp[0]?.total === null ? 0 : total_supp[0]?.total;
        
        // const total_despesas = Number(total_expenses) + Number(total_support);
        const total_despesas = Number(total_expenses);
        const total_invoices = total_invs._sum.value == null ? 0 : total_invs._sum.value;
        resultt[`SUPPORT`] = total_support;
        resultt[`TOTAL_EXPENSES`] = total_despesas;
        resultt[`TOTAL_INVOICES`] = total_invoices;

        let total_amount = 0;
        let total_ganho = 0;
        let total_expensive = 0;
        let total_labour = 0;
        let total_profit = 0;

        let aux = 0;
        if(clients.length > 0) {
            clients.forEach((client: any) => {
                const info: any = {};
                const invoice_info = total_invoices_by_clients.find(
                    (information: any) => information.fk_id_client === client.fk_id_client
                  );
               

                const labour_info = total_labour_by_client.find(
                    (information: any) => information.fk_id_client === client.fk_id_client
                  );
                

                // console.log(invoice_info, labour_info)
                if(invoice_info) {
                    info.amount = invoice_info._sum.value != null ? invoice_info._sum.value : 0;
                    // info.ganho = invoice_info._sum.value != null && total_invoices > 0 ? invoice_info._sum.value / total_invoices : 0;
                    // info.expensive_value = info.ganho != null && total_despesas > 0 ? info.ganho * total_despesas : 0;
                    // info.expensive_value = total_despesas > 0 ? total_despesas / (total_invoices * info.amount) : 0;
                    info.expensive_value = total_despesas > 0 ? total_despesas / total_invoices * info.amount : 0;
                    info.ganho = invoice_info._sum.value != null && total_invoices > 0 ?  info.expensive_value / info.amount : 0;
                    // info.ganho = invoice_info._sum.value != null && total_invoices > 0 ? total_despesas / invoice_info._sum.value : 0;
                    info.total_labour = labour_info ? labour_info?.total : 0;
                    info.profit = Number(Number(info.amount) - Number(info.expensive_value) - Number(info.total_labour));
                    total_amount += +info.amount
                    total_ganho += +info.ganho
                    total_expensive += +info.expensive_value
                    total_labour += +info.total_labour
                    total_profit += +info.profit
                    // console.log(info)
                }

                info.name = client.name;
                info.fk_id_client = client.fk_id_client;
                result.push(info);
            })
        }

        return {
            expenses: resultt,
            total_expenses: total_despesas,
            total_support,
            total_invoices,
            clients: result,
            total_amount,
            total_ganho,
            total_expensive,
            total_labour,
            total_profit
        };

    }
}