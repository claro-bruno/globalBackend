import {prisma} from "../../../database/prismaClient";
import {AppError} from "../../../middlewares/AppError";


interface IAccountContractor {
    id: number;
    access: string;
    status: string;
}

export class UpdateAccountContractorUseCase {
    async execute({ id, access, status }: IAccountContractor): Promise<any>{

        if(access!=="ADMIN") {
            throw new AppError('Permission Denied', 401)
        }

        const contractorExist = await prisma.contractors.findFirst({
            where: {
                id
            }
        });



        if(!contractorExist) {
            throw new AppError('Contractor does not exists', 401)
        }

        const contractorAccountExist = await prisma.accounts.findFirst({
            where: {
                id: contractorExist.fk_id_account
            }
        });

        const contractor = await prisma.contractors.update({
            where: {
                id
            },
            data: {
                status
            }
        });

        const contractorAccount = await prisma.accounts.update({
            where: {
                id: contractorAccountExist.id
            },
            data: {
                status,
                // resetPassword: true
            }
        });
        return contractor;
    }

}
