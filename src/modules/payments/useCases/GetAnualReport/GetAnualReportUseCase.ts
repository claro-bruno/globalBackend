
import { prisma} from "../../../../database/prismaClient";
import { AppError} from "../../../../middlewares/AppError";

interface IGetReport {
    year: number;
}

export class GetAnualReportUseCase {
    async execute({ year }: IGetReport) {
        const result: any = [];
        const contractors = await prisma.contractors.findMany();
        
        if(contractors.length > 0) {
            await contractors.reduce(async (memo: any, contractor: any) => {
                await memo;
                const info: any = {};
                const total_payments_by_contractor = await prisma.payments.groupBy({
                    by: ['month'],
                    _sum: {
                        value: true,
                        others: true
                    },
                    where: {
                        year,
                        fk_id_contractor: contractor.id,
                        type: 'CONTRACTOR_WORKERS',
                    },
                });
                const arr: any = [];
                if(total_payments_by_contractor.length > 0) {
                    total_payments_by_contractor.forEach((info) => {
                        const obj: any = {};
                        const total: any = typeof info == undefined || info == null ? 0 : info._sum.value;
                        const others: any = typeof info == undefined || info == null ? 0 : info._sum.others;
                        obj.month = info.month;
                        obj.total = total + others;
                        arr.push(obj);
                    });
                    
                }
                const total_payment = await prisma.paymentsContractors.aggregate({
                    _sum: {
                        value: true,
                        others: true
                    },
        
                    where: {
                        year,
                        fk_id_contractor: contractor.id,
                        type: 'CONTRACTOR_WORKERS',
                    }
                });
                if(total_payments_by_contractor) {
                    info.contrator = contractor;
                    info.payments = arr;
                    info.total_payments = total_payment._sum.value =! null ? total_payment._sum.value : 0;
                }
                result.push(info);
                
            }, undefined);

            
        }
        

        const total = await prisma.payments.aggregate({
            _sum: {
                value: true,
                others: true
            },

            where: {
                year,
                type: 'CONTRACTOR_WORKERS',
            }
        });

        return {
            result,
            total: total._sum.value != null ? total._sum.value : 0
        };
     

    }
}