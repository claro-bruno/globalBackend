import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";




interface IOrderMaterialsInventories {
    description: string;
    created_at: string;
    fk_id_client: number;
    fk_id_contractor: number;
    total: any;
    total_supplies?: any;
    total_inventories?: any;
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
    cost?: number;
    created_at: string;
}

interface IInfoInventory {
    order_id?: number;
    fk_id_inventory_sequence?: number;
    description?: string;
    qtd: number;
    cost?: number;
    total: number;
    created_at: string;
}

export class CreateOrderMaterialsInventoriesUseCase {
    async execute({ description, created_at, fk_id_client, fk_id_contractor, total, total_supplies, total_inventories, status, inventories, supplies }: IOrderMaterialsInventories): Promise<any> {



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
                return acc + Number(currently?.total)
            }, 0)
        }




        let totalInventories = 0;


        if (inventories.length > 0) {
            totalInventories = inventories.reduce((acc: number, currently: IInfoInventory) => {
                return acc + Number(currently.total)
            }, 0)
        }
        if (totalSupplies > 0 || totalInventories > 0) {
            const order = await prisma.ordersMaterialsInventories.create({
                data: {
                    description,
                    fk_id_client: fk_id_client,
                    fk_contractor_id: fk_id_contractor,
                    created_at: new Date(created_at),
                    total: (+totalInventories + +totalSupplies),
                    totalSupplies: +totalSupplies,
                    totalInventories: +totalInventories,
                    status
                }
            });

            await supplies.reduce(async (memo: any, info: IInfoSupply) => {
                await memo;

                const id_order: number = Number(order?.id)
                const id_material: number = Number(info?.fk_id_material)
                await prisma.orderMaterialsItems.create({
                    data: {
                        fk_id_order_materials: +id_order,
                        fk_id_material: +id_material,
                        qtd: +info.qtd,
                        description,
                        created_at: new Date(),
                        total: +info?.total
                    }
                });
            }, undefined);

            await inventories.reduce(async (memo: any, info: IInfoInventory) => {
                await memo;
                const id_order: number = Number(order?.id)
                const fk_id_inventory_sequence: number = Number(info?.fk_id_inventory_sequence)
                await prisma.orderInventoriesItems.create({
                    data: {
                        fk_id_order_materials_inventory: +id_order,
                        fk_id_inventory_sequence: +fk_id_inventory_sequence,
                        qtd: 1,
                        description,
                        created_at: new Date(),
                        total: info?.total
                    }
                });
            }, undefined);

            return order;
        }
        return 'ok';

    }
}