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
    inventories?: any;
    supplies: any;
}

interface IInfoSupply {
    order_id?: number;
    fk_id_material?: number;
    description?: string;
    qtd: number;
    total: number;
    created_at: string;
}

interface IInfoInventory {
    order_id?: number;
    fk_id_inventory_sequence?: number;
    description?: string;
    qtd: number;
    total: number;
    created_at: string;
}

export class UpdateOrderMaterialsInventoriesUseCase {
    async execute({ id, description, created_at, fk_id_client, fk_id_contractor, status, inventories, supplies }: IOrderMaterialsInventories): Promise<any> {
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


        if (supplies.length > 0) {
            totalSupplies = supplies.reduce((acc: number, currently: IInfoSupply) => {
                return acc + Number(currently.total)
            }, 0)
        }


        let totalInventories = 0;

        if (inventories.length > 0) {
            totalInventories = inventories.reduce((acc: number, currently: IInfoInventory) => {
                return acc + Number(currently.total)
            }, 0)
        }



        if (totalSupplies > 0 || totalInventories > 0) {
            const order = await prisma.ordersMaterialsInventories.update({
                where: {
                    id,
                },
                data: {
                    description,
                    fk_client_id: fk_id_client,
                    fk_contractor_id: fk_id_contractor,
                    created_at: new Date(created_at),
                    total: (+totalInventories + +totalSupplies),
                    totalSupplies: +totalSupplies,
                    totalInventories: +totalInventories,
                    status
                }
            });




            await prisma.orderMaterialsItems.deleteMany(
                {
                    where: {
                        fk_id_order_materials: +id
                    }
                });

            await supplies.reduce(async (memo: any, info: IInfoSupply) => {
                await memo;
                console.log(info)
                // const id_order: number = Number(order?.id)
                const id_material: number = Number(info?.fk_id_material)
                const date_at = new Date()
                await prisma.orderMaterialsItems.create({
                    data: {
                        fk_id_order_materials: +id,
                        fk_id_material: id_material,
                        qtd: +info.qtd,
                        description,
                        created_at: new Date(date_at),
                        total: +info.total
                    }
                });
            }, undefined);

            await prisma.orderInventoriesItems.deleteMany(
                {
                    where: {
                        fk_id_order_materials_inventory: +id
                    }
                });


            await inventories.reduce(async (memo: any, info: IInfoInventory) => {
                await memo;

                const id_order: number = Number(order?.id)
                const inventory_id: number = Number(info?.fk_id_inventory_sequence)
                //const date_at = new Date(info.created_at)
                await prisma.orderInventoriesItems.create({
                    data: {
                        fk_id_order_materials_inventory: +id,
                        fk_id_inventory_sequence: +inventory_id,
                        qtd: 1,
                        description,
                        created_at: new Date(),
                        total: +info.total
                    }
                });
            }, undefined);

            return order;
        }
        return 'ok';

    }
}