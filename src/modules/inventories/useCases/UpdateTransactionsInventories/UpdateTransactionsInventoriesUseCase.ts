
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IUpdateTransactionInventory {
    id: number;
    fk_id_inventory_sequence: string;
    fk_id_client: string;
    fk_user: number;
    description?: string;
    created_at: Date;
    status: string;
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
    async execute({ id, fk_id_client, fk_id_inventory_sequence, description, created_at, fk_user, status }: IUpdateTransactionInventory) {


        // console.log(id, fk_id_client, fk_id_inventory_sequence, description, created_at, fk_user, status)
        const transactionInventoryExist = await prisma.inventoriesTransactions.findFirst({
            where: {
                id,
            }
        });



        if (!transactionInventoryExist) {
            throw new AppError('Transaction does not exists', 400)
        }



        const data_transaction = new Date(created_at);


        // console.log(fk_id_client);

        //const ref = (fk_id_inventory_sequence.trim());
        const id_client = !isNaN ? Number(fk_id_client.split("-")[0]) : fk_id_client;
        // console.log('ref', ref);

        const equipment_data: any = await prisma.inventoriesSequence.findMany({
            where: {
                id: +fk_id_inventory_sequence,
            },
            select: {
                id: true,
                fk_id_inventory: true,
                inventories: {
                    select: {
                        id: true,
                        unit_cost: true,
                    }
                }
            }
        })




        const valor: any = equipment_data[0]?.inventories?.unit_cost

        const lastStatus: any = transactionInventoryExist?.status;

        // if (lastStatus !== status) {
        //     await prisma.logInventories.create({
        //         data: {
        //             fk_id_inventory_sequence: id,
        //             previous_status: lastStatus,
        //             new_status: status,
        //             description,
        //             created_at: new Date()
        //         }
        //     })
        // }


        await prisma.inventoriesTransactions.update({
            where: {
                id,
            },
            data: {
                fk_id_inventory_sequence: +fk_id_inventory_sequence,
                fk_id_client: +id_client,
                description,
                created_at: data_transaction,
                status,
                fk_user: +fk_user,
                cost: +valor,
                alter_at: new Date()
            }
        });



        return 'Ok';
    }
}