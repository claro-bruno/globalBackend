
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IUpdateInventory {
    id: number;
    name: string;
    description?: string;
    unit_cost: number;
    url_image?: string;
    status?: string;
    created_at?: Date;

}



export class UpdateInventoriesUseCase {
    async execute({ id, name, description, unit_cost, url_image, status, created_at }: IUpdateInventory) {



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
                url_image,
                status,
                created_at
            }
        });



        return 'Ok';
    }
}