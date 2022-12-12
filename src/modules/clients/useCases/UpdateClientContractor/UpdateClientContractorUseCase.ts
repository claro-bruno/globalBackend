import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IClientContractor {
    name: string;
    identification: string;
    phone?: string;
    address?: string;
    id: number;
}

export class UpdateClientContractorUseCase {
    async execute({ id, name, identification, phone, address } : IClientContractor): Promise<any>{
        //validar se o client existe
        const clientContractorExist = await prisma.clientsContractors.findUnique({
           where: {
            id
           }
        });

        if(!clientContractorExist) {
            throw new AppError('Client Contractor does not exists', 401)
        }


        const client_contractor = await prisma.clientsContractors.update({
            where: {
                id,
            },
            data: {
                name,
                identification,
                phone,
                address
            }
        });

        


        return client_contractor;
    }
}