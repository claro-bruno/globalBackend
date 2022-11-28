
import { prisma} from "../../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError} from "../../../../middlewares/AppError";
export class GetContractorsUseCase {
    async execute() {
        return prisma.contractors.findMany({
            orderBy: [{
                first_name: 'asc',
            }],
            select: {
                email: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                urlProfile: true,
                urlDocumentProof: true,
                urlPrimaryResidencyProof:true,
                urlSecondaryResidencyProof: true,
                status: true,
                ein: true,
                identification: true,
                dob: true,
                telephone: true,
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

