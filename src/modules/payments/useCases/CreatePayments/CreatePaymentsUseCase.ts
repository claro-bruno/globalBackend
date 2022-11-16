
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface ICreatePayments {
    contractor_id: string;
    year: number;
    month: string;
    payments: any;
}

function getMonthFromString(mon: string, year: number){

    const d = Date.parse(mon + "1, "+ year);
    if(!isNaN(d)){
        return new Date(d).getMonth();
    }
    return -1;
}

function toMonthName(monthNumber: number) {
    const date = new Date();
    date.setMonth(monthNumber);
  
    return date.toLocaleString('en-US', {
      month: 'long',
    });
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

         

         const { method, identifier, value, quarter, taxes } = payments[0];

         let paymentAlreadExists = await prisma.payments.findFirst({
            where: {
                identification: identifier,
                fk_id_contractor: +contractor_id
            }
         });

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
                            value: +value - taxes,
                            method,
                            year: +year,
                            month,
                            quarter: 1,
                            identification: identifier,
                            fk_id_contractor: +contractor_id
                        }
                    });

                    // const lastMonth = month == 'January' ? 'December' : toMonthName(getMonthFromString(month, year));
                    // const lastYear = month == 'January' ? year - 1 : year;

                    // const balanceLastMonthExist = await prisma.balances.findFirst({
                    //     where: {
                    //         month: lastMonth,
                    //         year: lastYear
                    //     }
                    // });

                    // const sumOutput = await prisma.payments.aggregate({
                    //     _sum: {
                    //         value: true
                    //     },

                    //     where: {
                    //         month,
                    //         year,
                    //         NOT: {
                    //             type: {
                    //                 equals: 'INPUT' as any
                    //             }
                    //         }
                    //     }
                    // });

                    // const sumInput = await prisma.payments.aggregate({
                    //     _sum: {
                    //         value: true
                    //     },

                    //     where: {
                    //         month,
                    //         year,
                    //         type: 'INPUT' as any
                    //     }
                    // });

                    // const balanceExist = await prisma.balances.findFirst({
                    //     where: {
                    //         month: month as any,
                    //         year
                    //     }
                    // });
            
                    // if(balanceExist && balanceLastMonthExist && sumInput._sum.value && sumOutput._sum.value) {
                    //     await prisma.balances.update({
                    //         where: {
                    //             id: balanceExist.id
                    //         }, 
                    //         data: {
                    //             value: balanceLastMonthExist.value +  sumInput._sum.value - sumOutput._sum.value
                    //         }
                    //     });
                    // }

                } else {

                    const paymentAlreadExists = await prisma.payments.findFirst({
                        where: {
                            identification: identifier
                        }
                     });
                     if(paymentAlreadExists) {
                        throw new AppError('Payment already exists');
                     }

                    await prisma.payments.create({
                        data: {
                            value: +value - taxes,
                            method,
                            year: +year,
                            month,
                            quarter: +quarter,
                            identification: identifier,
                            fk_id_contractor: +contractor_id,
                            type: 'CONTRACTOR_WORKERS'
                        }
                    });

                    // const balanceExist = await prisma.balances.findFirst({
                    //     where: {
                    //         month: month as any,
                    //         year
                    //     }
                    // });
            
                    // if(balanceExist) {
                    //     await prisma.balances.update({
                    //         where: {
                    //             id: balanceExist.id
                    //         }, 
                    //         data: {
                    //             value: balanceExist.value - value
                    //         }
                    //     });
                    // }
                }
             }
           
         
         


         
 

        const { method: method_2, identifier: identifier_2, value: value_2, quarter: quarter_2, taxes: taxes_2 } = payments[1];

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
                        value: +value_2 - taxes_2,
                        method: method_2,
                        year: +year,
                        month,
                        quarter: +quarter_2,
                        identification: identifier_2,
                        fk_id_contractor: +contractor_id
                    }
                });


                // const lastMonth = month == 'January' ? 'December' : toMonthName(getMonthFromString(month, year));
                // const lastYear = month == 'January' ? year - 1 : year;

                // const balanceLastMonthExist = await prisma.balances.findFirst({
                //     where: {
                //         month: lastMonth,
                //         year: lastYear
                //     }
                // });

                // const sumOutput = await prisma.payments.aggregate({
                //     _sum: {
                //         value: true
                //     },

                //     where: {
                //         month,
                //         year,
                //         NOT: {
                //             type: {
                //                 equals: 'INPUT' as any
                //             }
                //         }
                //     }
                // });

                // const sumInput = await prisma.payments.aggregate({
                //     _sum: {
                //         value: true
                //     },

                //     where: {
                //         month,
                //         year,
                //         type: 'INPUT' as any
                //     }
                // });

                // const balanceExist = await prisma.balances.findFirst({
                //     where: {
                //         month: month as any,
                //         year
                //     }
                // });
        
                // if(balanceExist && balanceLastMonthExist && sumInput._sum.value && sumOutput._sum.value) {
                //     await prisma.balances.update({
                //         where: {
                //             id: balanceExist.id
                //         }, 
                //         data: {
                //             value: balanceLastMonthExist.value +  sumInput._sum.value - sumOutput._sum.value
                //         }
                //     });
                // }


            } else {

                const paymentAlreadExists = await prisma.payments.findFirst({
                    where: {
                        identification: identifier_2
                    }
                 });
                 if(paymentAlreadExists) {
                    throw new AppError('Payment already exists');
                 }

                await prisma.payments.create({
                    data: {
                        value: +value_2 - taxes_2,
                        method: method_2,
                        year: +year,
                        month,
                        quarter: 2,
                        identification: identifier_2,
                        fk_id_contractor: +contractor_id,
                        type: 'CONTRACTOR_WORKERS'
                    }
                });

            //     const balanceExist = await prisma.balances.findFirst({
            //         where: {
            //             month: month as any,
            //             year
            //         }
            //     });
        
            //     if(balanceExist) {
            //         await prisma.balances.update({
            //             where: {
            //                 id: balanceExist.id
            //             }, 
            //             data: {
            //                 value: balanceExist.value - value_2
            //             }
            //         });
            //     }
            }
            
        }

        



         
 
       


        return 'Ok';
    }
}