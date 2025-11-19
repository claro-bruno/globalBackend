
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IUpdateInventory {
    id: number;
    name: string;
    description?: string;
    unit_cost: number;
    url_image?: string;
}



export class UpdateInventoriesUseCase {
    async execute({ id, name, description, unit_cost, url_image }: IUpdateInventory) {



        const inventoryExist = await prisma.inventories.findFirst({
            where: {
                id,
            }
        });




        if (!inventoryExist) {
            throw new AppError('inventory does not exists', 400)
        }










        await prisma.inventories.update({
            where: {
                id,
            },
            data: {
                name,
                description,
                unit_cost,
                url_image
            }
        });



        return 'Ok';
    }
}