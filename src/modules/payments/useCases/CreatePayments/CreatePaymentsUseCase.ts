
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";
function getMonthFromString(mon: string){

    var d = Date.parse(mon + "1, 2022");
    if(!isNaN(d)){
        return new Date(d).getMonth() + 1;
    }
    return -1;
}

interface ICreatePayments {
    contractor_id: string;
    year: number;
    month: string;
    payments: any;
}

export class CreatePaymentsUseCase {
    async execute({ contractor_id, month, year, payments }: ICreatePayments) {

        const contractorExist = await prisma.contractors.findUnique({
            where: {
                id: +contractor_id as number,
            }
         });
 
         if(!contractorExist) {
             throw new AppError('Contractor does not exists', 400)
         }

         let { type, identifier, value, quarter } = payments[0];
         let paymentExist = await prisma.payments.findFirst({
            where: {
                month: month as any,
                year: +year,
                quarter: 1,
                identification: identifier,
                fk_id_contractor: +contractor_id
            }
         });



         if(paymentExist) {
            await prisma.payments.update({
                where: {
                    id: paymentExist.id
                },
                data: {
                    value: +value,
                    method: type,
                    year: +year,
                    month,
                    quarter: +quarter,
                    identification: identifier,
                    fk_id_contractor: +contractor_id as number
                }
            });
        } else {
            await prisma.payments.create({
                data: {
                    value: +value,
                    method: type,
                    year: +year,
                    month,
                    quarter: +quarter,
                    identification: identifier,
                    description: 'descricao',
                    fk_id_contractor: +contractor_id as number
                }
            });
        }
 

        const { type_2, identifier_2, value_2, quarter_2 } = payments[1];
        paymentExist = await prisma.payments.findFirst({
            where: {
                month: month as string,
                year: +year,
                quarter: 2,
                identification: identifier_2,
                fk_id_contractor: +contractor_id as number,
            }
         });



         if(paymentExist) {
            await prisma.payments.update({
                where: {
                    id: paymentExist.id
                },
                data: {
                    value: +value_2,
                    method: type_2,
                    year: +year,
                    month,
                    quarter: +quarter_2,
                    identification: identifier_2,
                    fk_id_contractor: +contractor_id as number
                }
            });
        } else {
            await prisma.payments.create({
                data: {
                    value: +value_2,
                    method: type_2,
                    year: +year,
                    month,
                    quarter: +quarter_2,
                    identification: identifier_2,
                    description: 'descricao',
                    fk_id_contractor: +contractor_id as number
                }
            });
        }
 
       


        return '';
    }
}