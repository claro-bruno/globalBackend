import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";




interface IOrderMaterialsInventories {
    id: number;
    description: string;
    created_at: string;
    fk_id_client: number;
    fk_id_contractor: number;
    total?: any;
    status: string;
    // inventories?: any;
    supplies: any;
    fk_user: number;
}

interface IInfoSupply {
    order_id?: number;
    fk_id_material?: number;
    description?: string;
    qtd: number;

    total: number;
    totalSupplies: number;
    created_at: string;
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

// interface IInfoInventory {
//     order_id?: number;
//     fk_id_inventory_sequence?: number;
//     description?: string;
//     qtd: number;
//     total: number;
//     created_at: string;
// }

export class UpdateOrderMaterialsInventoriesUseCase {
    async execute({ id, description, created_at, fk_id_client, fk_id_contractor, status, supplies, fk_user }: IOrderMaterialsInventories): Promise<any> {
        // console.log(inventories)

        //validar se o client existe
        const orderExist = await prisma.ordersMaterialsInventories.findFirst({
            where: {
                id,
            }
        });

        if (!orderExist) {
            throw new AppError('Order does not exists', 401)
        }


        //validar se o client existe
        const clientExist = await prisma.clients.findFirst({
            where: {
                id: +fk_id_client,
            }
        });
        if (!clientExist) {
            throw new AppError('Client does not exists', 401)
        }

        //validar se o contractor existe
        const contractorExist = await prisma.contractors.findFirst({
            where: {
                id: +fk_id_contractor,
            }
        });
        if (!contractorExist) {
            throw new AppError('Contractor does not exists', 401)
        }

        let totalSupplies = 0;
        let totall = 0;

        if (supplies.length > 0) {
            totall = supplies.reduce((acc: number, currently: IInfoSupply) => {
                return acc + Number(currently?.total)
            }, 0)
            totalSupplies = supplies.reduce((acc: number, currently: IInfoSupply) => {
                return acc + Number(currently?.totalSupplies)
            }, 0)
        }



        // let totalInventories = 0;

        // if (inventories.length > 0) {
        //     totalInventories = inventories.reduce((acc: number, currently: IInfoInventory) => {
        //         return acc + Number(currently.total)
        //     }, 0)
        // }



        if (totalSupplies > 0) {
            const order = await prisma.ordersMaterialsInventories.update({
                where: {
                    id,
                },
                data: {
                    description,
                    fk_client_id: fk_id_client,
                    fk_contractor_id: fk_id_contractor,
                    created_at: new Date(created_at),
                    total: +totall,
                    totalSupplies: +totalSupplies,
                    totalInventories: 0,
                    status,
                    fk_user: +fk_user
                }
            });

            const data_transaction = !created_at ? new Date() : new Date(created_at)

            const month = toMonthName(new Date(data_transaction).getUTCMonth());
            const year = new Date(data_transaction).getUTCFullYear();


            await prisma.orderMaterialsItems.deleteMany(
                {
                    where: {
                        fk_id_order_materials: +id
                    }
                });

            await prisma.materialsTransactions.deleteMany(
                {
                    where: {
                        fk_order_id: +id
                    }
                });

            await supplies.reduce(async (memo: any, info: IInfoSupply) => {
                await memo;
                // const id_order: number = Number(order?.id)
                const id_material: number = Number(info?.fk_id_material?.toString().split(' - ')[0].trim())
                const date_at = new Date()
                await prisma.orderMaterialsItems.create({
                    data: {
                        fk_id_order_materials: +id,
                        fk_id_material: id_material,
                        qtd: +info.qtd,
                        description: info?.description,
                        created_at: new Date(date_at),
                        total: +info.total,

                    }
                });

                await prisma.materialsTransactions.create({
                    data: {
                        fk_id_material: +id_material,
                        quantity: +info.qtd,
                        total_cost: +info.total,
                        fk_id_input: 55,
                        fk_id_output: +fk_id_client,
                        description,
                        created_at: data_transaction,
                        month,
                        year,
                        fk_user: +fk_user,
                        alter_at: new Date()
                    }
                });

            }, undefined);






            // await inventories.reduce(async (memo: any, info: IInfoInventory) => {
            //     await memo;

            //     const id_order: number = Number(order?.id)
            //     const inventory_id: number = Number(info?.fk_id_inventory_sequence?.toString().split(' - ')[0].trim())
            //     //const date_at = new Date(info.created_at)
            //     await prisma.orderInventoriesItems.create({
            //         data: {
            //             fk_id_order_materials_inventory: +id,
            //             fk_id_inventory_sequence: +inventory_id,
            //             qtd: 1,
            //             description,
            //             created_at: new Date(),
            //             total: +info.total
            //         }
            //     });
            // }, undefined);

            return order;
        }
        return 'ok';

    }
}