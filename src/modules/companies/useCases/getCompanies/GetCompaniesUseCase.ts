
import { prisma} from "../../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError} from "../../../../middlewares/AppError";
export class GetCompaniesUseCase {
    async execute() {

        const companies = await prisma.companies.findMany({
            where: {
                status: true,
            }
        });

        return companies;

    }
}