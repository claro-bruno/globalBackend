import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IGetExpensive {
    id: number;
}

export class GetExpensiveUseCase {
    async execute({ id }: IGetExpensive): Promise<any> {
        //validar se o client existe
        const orderExist = await prisma.payments.findFirst({
            where: {
                id,
            },
        });

        if (!orderExist) {
            throw new AppError('Expense does not exists', 401)
        }


        return orderExist;
    }
}