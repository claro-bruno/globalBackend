import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IUpdateCost {
    id: number;
    date_at: string;
    cost: number;
}


export class UpdateCostUseCase {
    async execute({ id, date_at, cost }: IUpdateCost): Promise<any> {

        let ret: any = []
        const result = await prisma.costs.update({
            where: {
                id: +id,
            },
            data: {
                created_at: new Date(date_at),
                vcost: +cost
            }
        });




        return 'ok';

    }
}