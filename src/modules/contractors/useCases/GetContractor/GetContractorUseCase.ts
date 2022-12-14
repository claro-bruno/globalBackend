
import { prisma} from "../../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError} from "../../../../middlewares/AppError";
export class GetContractorUseCase {
    async execute(id: number) {
        const contractor = await prisma.contractors.findFirst({
            where: {
                id
            },
            include: {
                address: true,
            }
        });

        if(!contractor) {
            throw new AppError("Contractor does not exists");
        }


        return contractor;
    }
}