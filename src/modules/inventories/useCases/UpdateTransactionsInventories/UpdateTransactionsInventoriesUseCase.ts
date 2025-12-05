
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IUpdateTransactionInventory {
    id: number;
    fk_id_inventory_sequence: string;

    fk_id_client: string;

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
    async execute({ id, fk_id_client, fk_id_inventory_sequence, description, created_at }: IUpdateTransactionInventory) {


        const transactionInventoryExist = await prisma.inventoriesTransactions.findFirst({
            where: {
                id,
            }
        });




        if (!transactionInventoryExist) {
            throw new AppError('Transaction does not exists', 400)
        }




        const data_transaction = new Date(created_at);




        const id_equipament = Number(fk_id_inventory_sequence.split("-")[0]);
        const id_client = Number(fk_id_client.split("-")[0]);



        await prisma.inventoriesTransactions.update({
            where: {
                id,
            },
            data: {
                fk_id_inventory_sequence: id_equipament,
                fk_id_client: id_client,
                description,
                created_at: data_transaction,

            }
        });



        return 'Ok';
    }
}