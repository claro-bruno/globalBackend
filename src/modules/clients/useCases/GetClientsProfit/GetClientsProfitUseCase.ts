
import { prisma} from "../../../../database/prismaClient";
import { AppError} from "../../../../middlewares/AppError";

interface IGetDataClient {
    month: string;
    year: number;
}

export class GetClientsProfitUseCase {
    async execute({ year, month}: IGetDataClient) {
        const result: any = [];
        const clients = await prisma.clients.findMany({
            orderBy: [{ id: 'asc' }],
            where: {
                status: 'ACTIVE',
                NOT: 
                {
                    name: 'Support'
                }
                
            }
        });

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
           SELECT SUM(a.value) AS total FROM jobs AS j
            INNER JOIN quarters AS q ON q.fk_id_job = j.id
            INNER JOIN appointments AS a ON a.fk_id_quarter = q.id
            INNER JOIN clients AS c ON c.id = j.fk_id_client
            WHERE c.name = 'Support' AND q.month = ${month} AND q.year = ${year}
            ;`;
        
        const total_exp: any = await prisma.$queryRaw`
           SELECT SUM(a.value) AS total FROM payments AS p
            WHERE p.month = ${month} AND p.year = ${year} AND p.type != 'CONTRACTOR_WORKERS' AND p.type != 'INPUT'
            ;`;

        

        const total_expensives_by_type: any = await prisma.payments.groupBy({
            by: ['type'],
            _sum: {
                value: true
            },
            where: {
                month,
                year
            }
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


        const total_expenses = total_exp.total == null ? 0 : total_exp.total;
        const total_support = total_supp.total == null ? 0 : total_supp.total;
        const total_despesas = total_expenses + total_support;
        const total_invoices = total_invs._sum.value == null ? 0 : total_invs._sum.value;
        total_expensives_by_type.support = total_support;

        let info: any = {};

        if(clients.length > 0) {
            clients.forEach((client: any) => {
                const invoice_info = total_invoices_by_clients.find(
                    (info: any) => info.fk_id_client === client.fk_id_client
                  );

                const labour_info = total_labour_by_client.find(
                    (info: any) => info.fk_id_client === client.fk_id_client
                  );
                if(invoice_info) {
                    info.amount = invoice_info._sum.value != null ? invoice_info._sum.value : 0;
                    info.ganho = invoice_info._sum.value != null && total_invoices > 0 ? (invoice_info._sum.value / total_invoices) * 100 : 0;
                    info.expensive_value = invoice_info._sum.value != null && total_despesas > 0 ? invoice_info._sum.value * total_despesas : 0;
                    

                    if(labour_info) {
                        info.total_labour = labour_info.total != null ? labour_info.total : 0;
                        info.profit = labour_info.total != null &&  invoice_info._sum.value != null ? info.amount - info.expensive_value - info.total : 0;
                    }
                }

                info.name = client.name;
                info.fk_id_client = client.fk_id_client;
                result.push(info);
            })
        }

        return {
            expensives: total_expensives_by_type,
            clients: result,
            total_support,
            total_expenses: total_despesas,
            total_invoices
        };

    }
}