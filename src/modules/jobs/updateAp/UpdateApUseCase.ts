
import { prisma } from "../../../database/prismaClient";
import { AppError } from "../../../middlewares/AppError";



interface IAp {
    id: number;
    value: number;
}


export class UpdateApUseCase {
    async execute({
        id,
        value
    }: IAp) {
        const existAp = await prisma.appointments.findFirst({
            where: {
                id
            }
        });

        if (!existAp) {
            throw new AppError("Ap does not exist");
        }

        await prisma.appointments.updateMany({
            where: {
                id
            },
            data: {
                value: +value,
            }
        });
        return 'Ok';
    }
}