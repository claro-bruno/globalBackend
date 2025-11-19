
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface ICreateTransactionsInventory {
  fk_id_inventory: number;
  total_cost: number;
  quantity: number;
  fk_id_client?: number;
  sequence?: number;
  description?: string;
  created_at: Date;
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

export class CreateTransactionsInventoriesUseCase {
  async execute({ fk_id_inventory, quantity, total_cost, fk_id_client, sequence, description, created_at }: ICreateTransactionsInventory): Promise<any> {

    const data_transaction = new Date(created_at);


    const month = new Date(data_transaction).getUTCMonth();
    const year = new Date(data_transaction).getUTCFullYear();


    await prisma.inventoriesTransactions.create({
      data: {
        fk_id_inventory,
        quantity,
        total_cost,
        fk_id_client,
        sequence,
        description,
        created_at: data_transaction,
        month,
        year
      }
    });



    return 'Ok';
  }
}