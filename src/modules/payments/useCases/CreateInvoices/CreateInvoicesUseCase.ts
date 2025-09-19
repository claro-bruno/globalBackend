
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface ICreateinvoice {
  date_invoice: Date;
  value: number;
  identification: string;
  fk_id_client: string;
  description?: string;
  taxa: number;
  total_pago?: number;
  date_payment?: Date;
  method?: string;
  ref?: string;
  fk_id_order?: number;
  fk_id_contractor?: number;
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

export class CreateInvoicesUseCase {




  async execute({ date_invoice, value, identification, description, fk_id_client, taxa, total_pago, date_payment, method, ref, fk_id_order, fk_id_contractor }: ICreateinvoice) {
    const month = toMonthName(new Date(date_invoice).getUTCMonth());
    const year = new Date(date_invoice).getUTCFullYear();
    const id_client = fk_id_client.split("-");


    const orderExist = await prisma.orders.findFirst({
      where: {
        id: fk_id_order,
      }
    });

    if (!orderExist) {
      throw new AppError('Order does not exists', 400)
    }

    const data_invoice = new Date(date_invoice);

    const quarter = data_invoice.getDate() > 15 ? 2 : 1;
    const data_pagamento = date_payment ? new Date(date_payment) : undefined;
    // console.log('adsd')
    // console.log(date_invoice, value, identification, description, fk_id_client, taxa, total_pago, date_payment, method, ref, fk_id_order, fk_id_contractor)
    await prisma.invoices.create({
      data: {
        value: +value,
        date_at: data_invoice,
        date_log: data_invoice,
        fk_id_client: +id_client[0].trim(),
        identification,
        description,
        month,
        year,
        taxa: taxa ? +taxa : 0,
        total: +value + +taxa,
        total_pago: typeof total_pago !== "undefined" ? +total_pago : undefined,
        date_payment: typeof date_payment !== "undefined" ? data_pagamento : undefined,
        method,
        ref,
        fk_id_order: fk_id_order ? +fk_id_order : undefined,
        quarter: quarter ? +quarter : undefined,
        fk_id_contractor: fk_id_contractor ? +fk_id_contractor : undefined,
      }
    });



    return 'Ok';
  }
}