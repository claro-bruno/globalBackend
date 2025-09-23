
import { prisma } from "../../../../database/prismaClient";

interface IGetInvoices {
    month: string;
    year: number;
}

function getMonthFromString(mon: string) {
    var d = Date.parse(mon + "1, 2023");
    if (!isNaN(d)) {
        return new Date(d).getMonth() + 1;
    }
    return -1;
}

function toMonthName(monthNumber: number) {
    const date = new Date();
    date.setMonth(monthNumber);
    // console.log(monthNumber)
    return date.toLocaleString("en-US", {
        month: "long"
    });
}

export class GetInvoicesByMonthUseCase {
    async execute({ month, year }: IGetInvoices) {


        let rett: any = []
        let result: any = []

        if (month && year) {
            result = await prisma.invoices.findMany({
                orderBy: [{ date_at: 'desc' }],
                where: {
                    month,
                    year
                },
                select: {
                    id: true,
                    date_at: true,
                    date_log: true,
                    date_payment: true,
                    method: true,
                    ref: true,
                    value: true,
                    taxa: true,
                    total: true,
                    total_pago: true,
                    quarter: true,
                    identification: true,
                    description: true,
                    month: true,
                    year: true,
                    fk_id_order: true,
                    fk_id_client: true,
                    client: {
                        select: {
                            name: true,
                        }
                    },
                    fk_id_contractor: true,
                    contractor: {
                        select: {
                            first_name: true,
                            last_name: true,
                        }
                    }

                }
            });
        } else if (year) {
            result = await prisma.invoices.findMany({
                orderBy: [{ date_at: 'desc' }],
                where: {
                    year
                },
                select: {
                    id: true,
                    date_at: true,
                    date_log: true,
                    date_payment: true,
                    method: true,
                    ref: true,
                    value: true,
                    taxa: true,
                    total: true,
                    total_pago: true,
                    quarter: true,
                    identification: true,
                    description: true,
                    month: true,
                    year: true,
                    fk_id_order: true,
                    fk_id_client: true,
                    client: {
                        select: {
                            name: true,
                        }
                    },
                    fk_id_contractor: true,
                    contractor: {
                        select: {
                            first_name: true,
                            last_name: true,
                        }
                    }

                }
            });
        }


        const ress = await prisma.orders.groupBy({
            by: ['fk_invoice_id'],
        });

        // console.log(res)

        // res.forEach((i: any) => {
        //     const dt = new Date(i?.created_at)

        //     const fullYear = dt.getUTCFullYear();
        //     const fullMonth = dt.getUTCMonth() + 1;
        //     const fullMonthLiteral = toMonthName(fullMonth - 1);
        //     if (fullMonthLiteral === month && fullYear === year) {
        //         rett.push(i)
        //     }

        // })

        const sum_invoices = await prisma.invoices.aggregate({
            _sum: {
                total: true,
                total_pago: true
            },

            where: {
                month,
                year
            }
        });

        // result.forEach((i: any) => {

        // })

        const total = sum_invoices._sum.total == null ? 0 : +sum_invoices._sum.total;
        const total_pago = sum_invoices._sum.total_pago == null ? 0 : +sum_invoices._sum.total_pago;
        return {
            invoices: result,
            total: {
                total,
                total_pago,
                diferenca: +total_pago - +total
            }
        };


    }
}