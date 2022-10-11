
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

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

         const { method, identifier, value, quarter } = payments[0];

         if(identifier != null) {
            const paymentExist_1 = await prisma.payments.findFirst({
                where: {
                    month: month as any,
                    year: +year,
                    quarter: 1,
                    identification: identifier,
                    fk_id_contractor: +contractor_id
                }
             });
             if(paymentExist_1) {
                await prisma.payments.update({
                    where: {
                        id: paymentExist_1.id
                    },
                    data: {
                        value: +value,
                        method,
                        year: +year,
                        month,
                        quarter: 1,
                        identification: identifier,
                        fk_id_contractor: +contractor_id
                    }
                });
            } else {
                await prisma.payments.create({
                    data: {
                        value: +value,
                        method,
                        year: +year,
                        month,
                        quarter: +quarter,
                        identification: identifier,
                        description: 'descricao',
                        fk_id_contractor: +contractor_id
                    }
                });
            }
         }
         


         
 

        const { method: method_2, identifier: identifier_2, value: value_2, quarter: quarter_2 } = payments[1];

        if(identifier_2 != null) {
            const paymentExist_2 = await prisma.payments.findFirst({
                where: {
                    month: month as string,
                    year: +year,
                    quarter: +quarter_2,
                    identification: identifier_2,
                    fk_id_contractor: +contractor_id
                }
             });

             if(paymentExist_2) {
                await prisma.payments.update({
                    where: {
                        id: paymentExist_2.id
                    },
                    data: {
                        value: +value_2,
                        method: method_2,
                        year: +year,
                        month,
                        quarter: +quarter_2,
                        identification: identifier_2,
                        fk_id_contractor: +contractor_id
                    }
                });
            } else {
                await prisma.payments.create({
                    data: {
                        value: +value_2,
                        method: method_2,
                        year: +year,
                        month,
                        quarter: 2,
                        identification: identifier_2,
                        description: 'descricao',
                        fk_id_contractor: +contractor_id
                    }
                });
            }
        }

        



         
 
       


        return '';
    }
}