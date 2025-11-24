import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IClientContractor {
    contrator_id: number;
    client_contractor_id: number;
}

export class UpdateActiveClientContractorUseCase {
    async execute({ contrator_id, client_contractor_id }: IClientContractor): Promise<any> {
        //validar se o client existe
        const clientContractorExist = await prisma.clientsContractors.findUnique({
            where: {
                id: client_contractor_id
            }
        });

        if (!clientContractorExist) {
            throw new AppError('Client Contractor does not exists', 401)
        }

        //validar se o contractor existe
        const contractorExist = await prisma.contractors.findUnique({
            where: {
                id: contrator_id
            }
        });

        if (!contractorExist) {
            throw new AppError('Contractor does not exists', 401)
        }


        const client_contractor = await prisma.contractors.update({
            where: {
                id: contrator_id,
            },
            data: {
                fk_id_client_contractor: client_contractor_id
            }
        });




        return 'Ok';
    }
}