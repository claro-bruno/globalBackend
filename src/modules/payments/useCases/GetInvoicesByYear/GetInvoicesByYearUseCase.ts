
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IGetInvoices {
    year: number;
}

export class GetInvoicesByYearUseCase {
    async execute({ year }: IGetInvoices) {

        // const result: any = {};
        var result: any = [
            {
                month: "January",
                total: 0,
                total_pago: 0,
                diferenca: 0
            },
            {
                month: "February",
                total: 0,
                total_pago: 0,
                diferenca: 0
            },
            {
                month: "March",
                total: 0,
                total_pago: 0,
                diferenca: 0
            },
            {
                month: "April",
                total: 0,
                total_pago: 0,
                diferenca: 0
            },
            {
                month: "May",
                total: 0,
                total_pago: 0,
                diferenca: 0
            },
            {
                month: "June",
                total: 0,
                total_pago: 0,
                diferenca: 0
            },
            {
                month: "July",
                total: 0,
                total_pago: 0,
                diferenca: 0
            },
            {
                month: "August",
                total: 0,
                total_pago: 0,
                diferenca: 0
            },
            {
                month: "September",
                total: 0,
                total_pago: 0,
                diferenca: 0
            },
            {
                month: "October",
                total: 0,
                total_pago: 0,
                diferenca: 0
            },
            {
                month: "November",
                total: 0,
                total_pago: 0,
                diferenca: 0
            },
            {
                month: "December",
                total: 0,
                total_pago: 0,
                diferenca: 0
            },

        ];


        const result_months = await prisma.invoices.groupBy({
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


        const sum_invoices = await prisma.invoices.aggregate({
            _sum: {
                total: true,
                total_pago: true
            },

            where: {
                year
            }
        });

        /*
         const payments_type = resTypes.find(
                (info: any) => info.type === type
              );
              resultt[`${type}`] = typeof payments_type === 'undefined' || payments_type === null ? 0 : payments_type._sum.value as any;
 
        */
        result.forEach((inf: any, index: number) => {
            // console.log(info);
            const infoResult: any = [];

            const invoice_info: any = result_months.find(
                (info: any) => info.month === inf.month
            );
            // console.log(invoice_info?._sum?.total);
            result[index].total = typeof invoice_info === 'undefined' || invoice_info === null ? 0 : invoice_info?._sum?.total as any;
            // console.log(result.total);
            result[index].total_pago = typeof invoice_info === 'undefined' || invoice_info === null ? 0 : invoice_info._sum.total_pago as any;
            result[index].diferenca = typeof invoice_info === 'undefined' || invoice_info === null
                ? 0
                : +invoice_info?._sum?.total - +invoice_info?._sum?.total_pago as any;
            // result[`${month}`] = typeof invoice_info === 'undefined' || invoice_info === null ? 0 : invoice_info._sum.total as any;
            // result[`${month}`] = month;
            // infoResult.month = month;
            // infoResult.total = typeof invoice_info === 'undefined' || invoice_info === null ? 0 : invoice_info._sum.value as any;
            // result.push(infoResult);
        });

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