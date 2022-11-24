
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
            select: {
                address: true,
                account: {
                    select: {
                        access: true,
                    }
                }
            }
            // include: {
            //     address: true,
            //     account: true
            // },
        });
    }
}

