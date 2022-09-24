import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";
import { AppError} from "../../../../middlewares/AppError";

interface IUpdateClient {
    // username: string;
    // password: string;
    id: number,
    email: string;
    // name: string;
    identification?: string;
    // address?: string;
    // birthday?: string;
    telephone?: string;
    urlPrimaryResidencyProof: string;
    urlDocumentProof: string;
    urlProfile: string;
}


export class UpdateContractorUseCase {
    async execute({ id, email, identification, telephone,urlPrimaryResidencyProof, urlDocumentProof, urlProfile } : IUpdateClient): Promise<any>{
        //validar se o client existe
        const clientExist = await prisma.contractors.findUnique({
           where: {
               email: email.toLowerCase()
           }
        });

        if(!clientExist) {
            throw new AppError('Contractor does not exists', 401)
        }

        //atualizar o contractor
        const client = await prisma.contractors.update({
            where: {
                id
            },
            data: {
                email,
                identification,
                telephone,
                urlDocumentProof,
                urlPrimaryResidencyProof,
                urlProfile,
            }
        });
        return client;
    }
}