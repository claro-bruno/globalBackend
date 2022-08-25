import { prisma } from "../../../../database/prismaClient";
import { AppError} from "../../../../middlewares/AppError";

interface IUpdateCompany {
    id: number;
    name: string;
    sunday: boolean;
    monday: boolean;
    tuesday: boolean
    wednesday: boolean
    thursday: boolean
    friday: boolean;
    saturday: boolean;
    start: string;
    end: string;
    status: boolean
}


export class UpdateClientUseCase {
    async execute({ id, name, sunday, monday, tuesday, wednesday, thursday, friday, saturday, start, end, status  }  : IUpdateCompany): Promise<any>{
        //validar se o client existe
        const clientExist = await prisma.clients.findFirst({
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
                name,
                sunday,
                monday,
                tuesday, 
                wednesday,
                thursday,
                friday, 
                saturday,
                start,
                end,
                status
            }
        });
        return client;
    }
}