
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IDeleteteExpensives {

    id: number;
}






export class DeleteExpensivesUseCase {
    async execute({ id }: IDeleteteExpensives) {







        const expensiveExist = await prisma.payments.findFirst({
            where: {
                id,
            }
        });




        if (!expensiveExist) {
            throw new AppError('Expensive does not exists', 400)
        }





        await prisma.payments.delete({
            where: {
                id: +id,
            },
        });


        return 'Ok';
    }

}