import { prisma } from "../../../../database/prismaClient";
import { AppError} from "../../../../middlewares/AppError";

interface IUpdateCompany {
    id: string;
    status: boolean
}


export class UpdateStatusClientUseCase {
    async execute({ id, status  }  : IUpdateCompany): Promise<any>{
        //validar se o client existe
        const clientExist = await prisma.clients.findUnique({
           where: {
               id
           }
        });

        if(!clientExist) {
            throw new AppError('Client does not exists', 401)
        }
        //salvar o client
        const client = await prisma.clients.update({
            where: {
                id
            },
            data: {
                status
            }
        });
        return client;
    }
}