
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IUpdateInvoice {
    date_invoice: Date;
    value: number;
    identification?: string;
    fk_id_client: number;
    description?: string;
    id: number;
    taxa: number;
    total_pago?: number;
    date_payment?: Date;
    method?: string;
    ref?: string;
    fk_id_order?: number;
    quarter?: number;
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

export class UpdateInvoicesUseCase {
    async execute({ id, date_invoice, value, identification, description, fk_id_client, taxa, quarter, total_pago, date_payment, method, ref, fk_id_order }: IUpdateInvoice) {

        const month = toMonthName(new Date(date_invoice).getUTCMonth());
        const year = new Date(date_invoice).getUTCFullYear();

        const invoiceExist = await prisma.invoices.findFirst({
            where: {
                id,
            }
        });

        const invoiceAlreadyExist = await prisma.invoices.findFirst({
            where: {
                identification,
            }
        });

        if (!invoiceExist) {
            throw new AppError('Invoice does not exists', 400)
        }

        if (invoiceAlreadyExist && invoiceAlreadyExist?.identification !== identification) {
            throw new AppError('Invoice already exists', 400)
        }



        const date = new Date(date_invoice);

        const data_pagamento = date_payment ? new Date(date_payment) : undefined;

        await prisma.invoices.update({
            where: {
                id,
            },
            data: {
                value: +value,
                date_at: date,
                fk_id_client: +fk_id_client,
                identification,
                description,
                year,
                month,
                taxa: taxa ? +taxa : 0,
                total: +value + +taxa,
                total_pago: typeof total_pago !== "undefined" ? +total_pago : undefined,
                date_payment: typeof date_payment !== "undefined" ? data_pagamento : undefined,
                method,
                ref,
                fk_id_order: fk_id_order ? +fk_id_order : undefined,
                quarter: quarter ? +quarter : undefined
            }
        });



        return 'Ok';
    }
}