import { prisma } from "../../../database/prismaClient";
import { AppError } from "../../../middlewares/AppError";
import { hash } from "bcrypt";


interface IAccountContractor {
    id: number;
    password: string;
    idToken: number;
    account_id: number,
}

export class UpdatePasswordAccountContractorUseCase {
    async execute({ id, idToken, account_id, password }: IAccountContractor): Promise<any> {

        console.log(id, idToken);
        if (id != idToken) throw new AppError('Invalid Request', 401)

        const contractorExist = await prisma.contractors.findFirst({
            where: {
                id,
                fk_id_account: account_id
            }
        });



        if (!contractorExist) {
            throw new AppError('Contractor does not exists', 401)
        }


        const hashPassword = await hash(password, 10);

        const contractor = await prisma.accounts.update({
            where: {
                id: +account_id
            },
            data: {
                password: hashPassword,
                resetPassword: false
            }
        });
        return contractor;
    }

}
