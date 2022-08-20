
import { prisma} from "../../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError} from "../../../../middlewares/AppError";
export class GetCompanyUseCase {
    async execute(id) {

        const company = await prisma.companies.findFirst({
            where: {
                id,
                status: true
            }
        });

        if(!company) {
            throw new AppError("Company does not exists");
        }



        return company;

    }
}