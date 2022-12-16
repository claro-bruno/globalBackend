import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IClientContractor {
    name: string;
    identification: string;
    phone?: string;
    address?: string;
    id_contractor: number;
}

export class CreateClientContractorUseCase {
    async execute({ name, identification, phone, address, id_contractor } : IClientContractor): Promise<any>{
        //validar se o client existe
        // const clientContractorExist = await prisma.contractors.findUnique({
        //    where: {
        //        id: id_contractor
        //    }
        // });


        const client_contractor = await prisma.clientsContractors.create({
            data: {
                name,
                identification,
                phone,
                address
            }
        });

        await prisma.contractors.update({
            where: {
                id: id_contractor
            },
            data: {
                fk_id_client_contractor: client_contractor.id
            }
        });


        return client_contractor;
    }
}