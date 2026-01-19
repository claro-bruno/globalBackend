
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IUpdateTransactionMaterial {
    id: number;
    fk_id_material: any;
    quantity: number;
    fk_id_output?: any;
    fk_id_input?: any;
    description?: string;
    created_at: Date;
    fk_user: string;
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
    async execute({ id, fk_id_material, quantity, fk_id_input, fk_id_output, description, created_at, fk_user }: IUpdateTransactionMaterial) {
        const id_material = isNaN(fk_id_material) ? Number(fk_id_material.split("-")[0]) : fk_id_material;

        const transactionMaterialExist = await prisma.materialsTransactions.findFirst({
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


        const input_id: number = isNaN(fk_id_input) ? Number(fk_id_input.split("-")[0]) : fk_id_input;
        const output_id = isNaN(fk_id_output) ? Number(fk_id_output.split("-")[0]) : fk_id_output;



        const res = await prisma.materials.findMany({
            where: {
                id: id_material
            }
        });



        const cost = res[0]?.unit_cost || 0;
        const total = quantity * cost;




        await prisma.materialsTransactions.update({
            where: {
                id,
            },
            data: {
                quantity,
                total_cost: +total,
                fk_id_input: +input_id,
                fk_id_output: +output_id,
                description,
                created_at: data_transaction,
                month,
                year,
                alter_at: new Date(),
                fk_user: +fk_user
            }
        });



        return 'Ok';
    }
}