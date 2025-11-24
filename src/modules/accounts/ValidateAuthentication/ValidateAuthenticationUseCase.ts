import { prisma } from "../../../database/prismaClient";
import { AppError } from "../../../middlewares/AppError";


export class ValidateAuthenticationUseCase {
    async execute(id: number, access: string): Promise<any> {
        const contractorExist = await prisma.accounts.findFirst({
            where: {
                id,
                access: access as any
            }
        });
        if (!contractorExist) {
            throw new AppError("Permission Required");
        }

        return contractorExist;

    }
}