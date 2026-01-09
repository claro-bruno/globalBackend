
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

        let id_inventory_sequence: any = '';
        const id_client = isNaN(fk_id_client as any) ? Number(fk_id_client.split(" - ")[0].trim()) : fk_id_client;
        if (!isNaN(fk_id_inventory_sequence as any)) {
            id_inventory_sequence = fk_id_inventory_sequence;
        } else {
            const ref = fk_id_inventory_sequence.split(" ")[0].trim();
            const res = await prisma.inventoriesSequence.findMany({

                where: {
                    ref,
                }
            });
            id_inventory_sequence = res[0]?.id;
        }


        console.log(id, fk_id_client, fk_id_inventory_sequence, description, created_at, fk_user, status)
        throw new AppError('Testando', 400)



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
        // console.log('ref', ref);

        // const id_client = isNaN(fk_id_client) ? Number(fk_id_client.split(" - ")[0].trim()) : fk_id_client;


        const equipment_data: any = await prisma.inventoriesSequence.findMany({
            where: {
                id: +id_inventory_sequence,
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
        //const id_fk_inventory_sequence = equipment_data[0]?.id;
        const lastStatus: any = transactionInventoryExist?.status;





        await prisma.inventoriesSequence.update({
            where: {
                id: +id_inventory_sequence,
            },
            data: {
                status
            }
        })

        await prisma.inventoriesTransactions.update({
            where: {
                id,
            },
            data: {
                fk_id_inventory_sequence: +id_inventory_sequence,
                fk_id_client: +id_client,
                description,
                created_at: data_transaction,
                status,
                fk_user: +fk_user,
                cost: +valor,
                alter_at: new Date()
            }
        });

        await prisma.logInventories.create({
            data: {
                fk_id_inventory_sequence: +id_inventory_sequence,
                previous_status: lastStatus,
                new_status: status,
                description,
                alter_at: new Date(),

                created_at: data_transaction,
                fk_id_location: +id_client,
                fk_id_user: +fk_user
            }
        })

        return 'Ok';
    }
}