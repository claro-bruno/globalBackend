
import { prisma} from "../../../../database/prismaClient";

interface IGetReport {
    year: number;
}

const headerTableMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  
export class GetAnualReportUseCase {
    async execute({ year }: IGetReport) {
        const result: any = [];
        
        const contractors = await prisma.contractors.findMany({
            orderBy: [ { first_name: 'asc' }],
            select: {
                id: true,
                first_name: true,
                last_name: true,
                middle_name: true,
                telephone: true,
                identification: true,
                email: true,
                address: {
                    select: {
                        address: true,
                    }
                }
            }
        });
        
        if(contractors.length > 0) {
            await contractors.reduce(async (memo: any, contractor: any) => {
                await memo;
                const info: any = {};
                const total_payments_by_contractor = await prisma.paymentsContractors.groupBy({
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
                // const arr_month_arr: any = [];
                if(total_payments_by_contractor.length > 0) {
                    headerTableMonths.forEach((info) => {
                        const obj: any = {};
                        const res: any = total_payments_by_contractor.find((res_month) => res_month?.month === info)

                        if(res) {
                            const total: any = typeof res == undefined || res == null ? 0 : res._sum.value;
                            const others: any = typeof res == undefined || res == null ? 0 : res._sum.others;
                            obj.month = info;
                            obj.total = total;
                            arr.push(obj);
                        }
                       
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
                    info.contractor = contractor;
                    info.payments = arr;
                    info.total = total_payment._sum.value =! null ? total_payment._sum.value : 0;
                }
                if(info.total > 0) {
                    result.push(info);
                }
                
                
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