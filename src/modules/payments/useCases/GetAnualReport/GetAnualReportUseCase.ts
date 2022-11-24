
import { prisma} from "../../../../database/prismaClient";
import { AppError} from "../../../../middlewares/AppError";

interface IGetReport {
    year: number;
}

export class GetAnualReportUseCase {
    async execute({ year }: IGetReport) {
        const result: any = [];
        const contractors = await prisma.contractors.findMany();
        let info: any = {};
        if(contractors.length > 0) {
            contractors.forEach(async (contractor) => {
                const total_payments_by_contractor = await prisma.payments.groupBy({
                    by: ['month'],
                    _sum: {
                        value: true
                    },
                    where: {
                        year,
                        fk_id_contractor: contractor.id,
                        type: 'CONTRACTOR_WORKERS',
                    },
                });
                const total_payment = await prisma.payments.aggregate({
                    _sum: {
                        value: true
                    },
        
                    where: {
                        year,
                        fk_id_contractor: contractor.id,
                        type: 'CONTRACTOR_WORKERS',
                    }
                });
                if(total_payments_by_contractor) {
                    info.total_payments = total_payment._sum.value =! null ? total_payment._sum.value : 0;
                    info.payments = total_payments_by_contractor;
                    info.contrator = contractor;
                }
                
                
            });

            
        }
        

        const total = await prisma.payments.aggregate({
            _sum: {
                value: true
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