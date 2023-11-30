import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";
import { contractorsRoutes } from "../../../../routes/contractors.routes";

interface ICreateCost {
    date_at: string;
    cost: number;
}


export class CreateCostUseCase {
    async execute({ date_at, cost }: ICreateCost): Promise<any> {







        const result = await prisma.costs.create({
            data: {
                created_at: new Date(date_at),
                vcost: +cost

            }
        });


        return 'ok';

    }
}