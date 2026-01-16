
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IUpdateMaterial {
    id: number;
    name: string;
    description?: string;
    unit_cost: number;
    url_image?: string;
    created_at: Date;
    category?: string;
    fk_user?: number;
}



export class UpdateMaterialsUseCase {
    async execute({ id, name, description, unit_cost, url_image, created_at, fk_user, category }: IUpdateMaterial) {



        const materialExist = await prisma.materials.findFirst({
            where: {
                id,
            }
        });




        if (!materialExist) {
            throw new AppError('Material does not exists', 400)
        }



        const data_material = new Date(created_at);

        await prisma.materials.update({
            where: {
                id,
            },
            data: {
                name,
                description,
                unit_cost: +unit_cost,
                url_image,
                created_at: data_material,
                fk_user,
                category
            }
        });



        return 'Ok';
    }
}