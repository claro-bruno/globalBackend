
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IUpdateTransactionMaterial {
    id: number;
    fk_id_material: number;
    total_cost: number;
    quantity: number;
    fk_id_output?: number;
    fk_id_input?: number;
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

export class UpdateTransactionsMaterialsUseCase {
    async execute({ id, quantity, total_cost, fk_id_input, fk_id_output, description, created_at }: IUpdateTransactionMaterial) {



        const transactionMaterialExist = await prisma.invoices.findFirst({
            where: {
                id,
            }
        });




        if (!transactionMaterialExist) {
            throw new AppError('Transaction does not exists', 400)
        }



        const data_transaction = new Date(created_at);


        const month = toMonthName(new Date(data_transaction).getUTCMonth());
        const year = new Date(data_transaction).getUTCFullYear();







        await prisma.materialsTransactions.update({
            where: {
                id,
            },
            data: {
                quantity,
                total_cost,
                fk_id_input,
                fk_id_output,
                description,
                created_at: data_transaction,
                month,
                year
            }
        });



        return 'Ok';
    }
}