
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IUpdateTransactionInventory {
    id: number;
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

export class UpdateTransactionsInventoriesUseCase {
    async execute({ id, quantity, total_cost, fk_id_client, fk_id_inventory, description, created_at, sequence }: IUpdateTransactionInventory) {



        const transactionInventoryExist = await prisma.invoices.findFirst({
            where: {
                id,
            }
        });




        if (!transactionInventoryExist) {
            throw new AppError('Transaction does not exists', 400)
        }



        const data_transaction = new Date(created_at);


        const month = new Date(data_transaction).getUTCMonth();
        const year = new Date(data_transaction).getUTCFullYear();







        await prisma.inventoriesTransactions.update({
            where: {
                id,
            },
            data: {
                quantity,
                total_cost,
                fk_id_inventory,
                fk_id_client,
                description,
                sequence,
                created_at: data_transaction,
                month,
                year
            }
        });



        return 'Ok';
    }
}