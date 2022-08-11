
import { prisma} from "../../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError} from "../../../../middlewares/AppError";
export class RemoveCompanyUseCase {
    async execute(id) {

        const companyExist = await prisma.companies.findFirst({
            where: {
                id
            }
        });

        if(!companyExist) {
            throw new AppError("Company does not exists");
        }


        const client = await prisma.companies.remove({
            where: {
                id,
            }
        });

        return client;

    }
}