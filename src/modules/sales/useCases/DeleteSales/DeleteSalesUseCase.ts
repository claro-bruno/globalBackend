
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IDeleteteSales {

    id: number;
}






export class DeleteSalesUseCase {
    async execute({ id }: IDeleteteSales) {



        // console.log(id)
        // throw new AppError('Inventory does not exists', 400)


        const salesExist = await prisma.sales.findFirst({
            where: {
                id,
            }
        });




        if (!salesExist) {
            throw new AppError('Sales does not exists', 400)
        }









        await prisma.sales.delete({
            where: {
                id: +id,
            },
        });



        return 'Ok';
    }

}