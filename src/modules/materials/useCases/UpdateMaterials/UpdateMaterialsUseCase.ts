
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IUpdateMaterial {
    id: number;
    name: string;
    description?: string;
    unit_cost: number;
    url_image?: string;
}



export class UpdateMaterialsUseCase {
    async execute({ id, name, description, unit_cost, url_image }: IUpdateMaterial) {



        const materialExist = await prisma.invoices.findFirst({
            where: {
                id,
            }
        });




        if (!materialExist) {
            throw new AppError('Material does not exists', 400)
        }










        await prisma.materials.update({
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