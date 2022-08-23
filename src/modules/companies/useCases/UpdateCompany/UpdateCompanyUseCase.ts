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
    thuesday: boolean
    friday: boolean;
    saturday: boolean;
    startHour: string;
    endHour: string;
    status: boolean
}


export class UpdateCompanyUseCase {
    async execute({ id, name, rangeHour, monday, sunday, tuesday, wednesday, thuesday, friday, saturday, startHour, endHour  }  : IUpdateCompany): Promise<any>{
        //validar se o client existe
        const companyExist = await prisma.contractors.findUnique({
           where: {
               id
           }
        });

        if(!companyExist) {
            throw new AppError('Company does not exists', 401)
        }
        //salvar o client
        const company = await prisma.contractors.update({
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
                thuesday, 
                friday, 
                saturday,
                startHour, 
                endHour
            }
        });
        return company;
    }
}