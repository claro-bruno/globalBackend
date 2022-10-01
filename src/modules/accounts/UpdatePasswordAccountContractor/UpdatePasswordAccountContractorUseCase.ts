import {prisma} from "../../../database/prismaClient";
import {AppError} from "../../../middlewares/AppError";
import {hash} from "bcrypt";


interface IAccountContractor {
    id: number;
    password: string;
    idToken: number;
}

export class UpdatePasswordAccountContractorUseCase {
    async execute({ id, idToken, password  }  : IAccountContractor): Promise<any>{
        if(id!=idToken) throw new AppError('Invalid Request', 401)

        const contractorExist = await prisma.contractors.findFirst({
            where: {
                id
            }
        });



        if(!contractorExist) {
            throw new AppError('Contractor does not exists', 401)
        }

        const contractorAccount = await prisma.accounts.findFirst({
            where: {
                id: contractorExist.fk_id_account,
                // resetPassword: true
            }
        });

        const hashPassword = await hash(password, 10);

        const contractor = await prisma.accounts.update({
            where: {
                id: contractorAccount.id
            },
            data: {
                password: hashPassword,
                resetPassword: false
            }
        });
        return contractor;
    }

}
