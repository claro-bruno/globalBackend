
import { prisma} from "../../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError} from "../../../../middlewares/AppError";
export class GetContractorsUseCase {
    async execute() {
        return prisma.contractors.findMany({
            orderBy: [{
                id: 'asc'
            }],
            include: {
                address: true,
                account: true
            },
        });
    }
}

