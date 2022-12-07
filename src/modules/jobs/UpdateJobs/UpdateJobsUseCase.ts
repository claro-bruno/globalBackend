
import e from "express";
import { prisma } from "../../../database/prismaClient";
import { AppError } from "../../../middlewares/AppError";

interface IAppointment {
    date: any;
    value: number;
}

interface IService {
    id: number;
    id_contractor: number;
    id_client: number;
    sunday?: boolean;
    monday?: boolean;
    tuesday?: boolean;
    wednesday?: boolean;
    thursday?: boolean;
    friday?: boolean;
    saturday?: boolean;
    start?: string;
    end?: string;
}


export class UpdateJobsUseCase {
    async execute({ 
        id, 
        id_contractor, 
        id_client, 
        sunday,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        start,
        end 
    }: IService) 
    {
        const existJob = await prisma.jobs.findFirst({
            where: {
                id
            }
        });

        if(!existJob) {
            throw new AppError("Job does not exist");
        }

        const alreadyExistsJobs = await prisma.jobs.findFirst({
            where: {
                fk_id_contractor: id_contractor,
                fk_id_client: id_client,
                status: 'ACTIVE'
            }
        });
        
        if(!alreadyExistsJobs || (existJob.fk_id_client === id_client && existJob.fk_id_contractor === id_contractor))
        {
            
            const start_value = start === null || !start || start === '' ? '' : start;
            const end_value = end === null || !end || end === '' ? '' : end;
            await prisma.jobs.update({
                where: {
                    id
                },
                data: {
                    fk_id_contractor: id_contractor,
                    fk_id_client: id_client,
                    monday : monday as boolean,
                    sunday: sunday as boolean,
                    tuesday: tuesday as boolean,
                    wednesday: wednesday as boolean,
                    thursday: thursday as boolean,
                    friday: friday as boolean,
                    saturday: saturday as boolean,
                    start: start_value, 
                    end: end_value
                }
            });
            return 'Ok';
        }
        else if(alreadyExistsJobs){
            throw new AppError("Job already exists");
            
            
        }
    }
}