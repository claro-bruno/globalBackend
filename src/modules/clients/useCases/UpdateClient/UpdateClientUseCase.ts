import { prisma } from "../../../../database/prismaClient";
import { AppError} from "../../../../middlewares/AppError";

interface IUpdateCompany {
    id: string;
    name: string;
    rangeHour: string;
    monday: boolean;
    sunday: boolean;
    tuesday: boolean
    wednesday: boolean
    thursday: boolean
    friday: boolean;
    saturday: boolean;
    startHour: string;
    endHour: string;
    status: boolean
}


export class UpdateClientUseCase {
    async execute({ id, name, rangeHour, monday, sunday, tuesday, wednesday, thursday, friday, saturday, startHour, endHour, status  }  : IUpdateCompany): Promise<any>{
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
                name,
                rangeHour,
                monday, 
                sunday, 
                tuesday, 
                wednesday,
                thursday,
                friday, 
                saturday,
                startHour, 
                endHour,
                status
            }
        });
        return client;
    }
}