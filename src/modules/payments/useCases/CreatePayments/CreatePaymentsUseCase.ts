import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface ICreatePayments {
  contractor_id: string;
  year: number;
  month: string;
  payments: any;
}

function getMonthFromString(mon: string, year: number) {
  const d = Date.parse(mon + "1, " + year);
  if (!isNaN(d)) {
    return new Date(d).getMonth() - 1;
  }
  return -1;
}

function toMonthName(monthNumber: number) {
  const date = new Date();
  date.setMonth(monthNumber);

  return date.toLocaleString("en-US", {
    month: "long"
  });
}



export class CreatePaymentsUseCase {
  async execute({ contractor_id, month, year, payments }: ICreatePayments) {
    
    let balanceLastMonthExist: any = {};

    const contractorExist = await prisma.contractors.findUnique({
      where: {
        id: +contractor_id as number
      }
    });
    

    if (!contractorExist) {
      throw new AppError("Contractor does not exists", 400);
    }

    let contractor_client_id: number = Number(contractorExist.fk_id_client_contractor)

    // Verificar o balance do mes atual
    const balanceMonthExist = await prisma.balances.findFirst({
        where: {
            month: month,
            year: year
        }
    });

    // Se não existir, seta do mes anterior
    

      const lastMonth = month == 'January' ? 'December' : toMonthName(getMonthFromString(month, year));
      const lastYear = month == 'January' ? year - 1 : year;

      balanceLastMonthExist = await prisma.balances.findFirst({
        where: {
          month: lastMonth,
          year: lastYear
        }
      });
    
    if(!balanceMonthExist) {  
      //setando o balance do mes anterior para o mes atual
      if(balanceLastMonthExist) {
        await prisma.balances.create({
          data: {
            month, 
            year,
            value: +balanceLastMonthExist?.value
          }
        });
      }
    }
       

    const {
      id,
      method,
      identifier,
      totalPayment: value,
      quarter,
      othersValue: value_others,
      othersDescription: description
    } = payments[0];
  let valor = value == null ? 0 : value;
  if(valor > 0 && identifier != "" && method != "") {
    if (id != '') {
      const pay_1 = await prisma.payments.update({
          where: {
            id
          },
          data: {
            value: valor,
            identification: identifier,
            others: +value_others,
            description
          }
        });
          await prisma.payments.update({
            where: {
              pay_id: id,
            },
            data: {
              value: +value_others,
              year: +year,
              month,
              type: "INPUT",
            }
          });


          // const invoice_payment = await prisma.invoicesContractors.findFirst({
          //   where: {
          //     fk_id_payment: id,
          //   }  
          // });
          // if(invoice_payment) {
          //   await prisma.invoicesContractors.update({
          //     where: {
          //       id: invoice_payment.id,
          //     }, 
          //     data: {
          //       fk_id_contractor: +contractor_id,
          //       fk_id_contractor_client: +contractor_client_id,
          //       month,
          //       year,
          //       quarter,
          //       total: valor
          //     }
          //   });
          // }
        
      } 
      else 
      {

        const pay_1 = await prisma.payments.create({
          data: {
            value: +valor,
            method,
            year: +year,
            month,
            quarter: +quarter,
            identification: identifier,
            fk_id_contractor: +contractor_id,
            type: "CONTRACTOR_WORKERS",
            others: +value_others,
            description
          }
        });
          await prisma.payments.create({
            data: {
              value: +value_others,
              year: +year,
              month,
              pay_id: +pay_1.id,
              type: "INPUT",

            }
          });
          // await prisma.invoicesContractors.create({ 
          //   data: {
          //     fk_id_payment: pay_1.id,
          //     fk_id_contractor: +contractor_id,
          //     fk_id_contractor_client: +contractor_client_id,
          //     month,
          //     year,
          //     quarter,
          //     total: valor
          //   }
          // });
      }

        const sumOutput = await prisma.payments.aggregate({
              _sum: {
                  value: true
              },

              where: {
                  month,
                  year,
                  NOT: {
                      type: {
                          equals: 'INPUT' as any
                      }
                  }
              }
          });

          const sumInput = await prisma.payments.aggregate({
              _sum: {
                  value: true
              },

              where: {
                  month,
                  year,
                  type: 'INPUT' as any
              }
          });

        const balanceExist = await prisma.balances.findFirst({
          where: {
              month: month as any,
              year
          }
      });

      const total_input = sumInput._sum.value == null ? 0 : sumInput._sum.value;  
      const total_output = sumOutput._sum.value == null ? 0 : sumOutput._sum.value;  
    
      if(balanceExist && balanceLastMonthExist) {
          await prisma.balances.update({
              where: {
                  id: balanceExist.id
              },
              data: {
                  value: balanceLastMonthExist.value + total_input - total_output
              }
          });
      }
      
    } else if(valor> 0){
        if(identifier == "" || method == "") {
          throw new AppError("Identifier and method are required!", 401);
        }
    }

    const {
      method: method_2,
      id: id_2,
      identifier: identifier_2,
      totalPayment: value_2,
      quarter: quarter_2,
      othersValue: value_others_2,
      othersDescription: description_2
    } = payments[1];
    
    valor = value_2 == null ? 0 : value_2;
    if(valor > 0 && identifier_2 != "" && method_2 != "") {
      if (id_2 != "") {
          await prisma.payments.update({
            where: {
              id: +id_2
            },
            data: {
              value: valor,
              identification: identifier_2,
              others: +value_others_2,
              description: description_2
            }
          });
            await prisma.payments.update({
              where: {
                pay_id: id_2,
              },
              data: {
                value: +value_others,
                year: +year,
                month,
                type: "INPUT",
              }
            });

            // const invoice_payment = await prisma.invoicesContractors.findFirst({
            //   where: {
            //     fk_id_payment: id_2,
            //   }  
            // });
            // if(invoice_payment) {
            //   await prisma.invoicesContractors.update({
            //     where: {
            //       id: invoice_payment.id,
            //     }, 
            //     data: {
            //       fk_id_contractor: +contractor_id,
            //       fk_id_contractor_client: +contractor_client_id,
            //       month,
            //       year,
            //       quarter,
            //       total: valor
            //     }
            //   });
            // }
            
        } 
        else 
        {
          const pay_2 = await prisma.payments.create({
            data: {
              value: valor,
              method,
              year: +year,
              month,
              quarter: +quarter_2,
              identification: identifier_2,
              fk_id_contractor: +contractor_id,
              type: "CONTRACTOR_WORKERS",
              others: +value_others_2,
              description: description_2
            }
          });
            await prisma.payments.create({
              data: {
                value: +value_others_2,
                year: +year,
                month,
                pay_id: +pay_2.id,
                type: "INPUT"
              }
            });
            // await prisma.invoicesContractors.create({ 
            //   data: {
            //     fk_id_payment: pay_2.id,
            //     fk_id_contractor: +contractor_id,
            //     fk_id_contractor_client: +contractor_client_id,
            //     month,
            //     year,
            //     quarter,
            //     total: valor
            //   }
            // });
      }
  
          const sumOutput = await prisma.payments.aggregate({
                _sum: {
                    value: true
                },
  
                where: {
                    month,
                    year,
                    NOT: {
                        type: {
                            equals: 'INPUT' as any
                        }
                    }
                }
            });
  
            const sumInput = await prisma.payments.aggregate({
                _sum: {
                    value: true
                },
  
                where: {
                    month,
                    year,
                    type: 'INPUT' as any
                }
            });
  
          const balanceExist = await prisma.balances.findFirst({
            where: {
                month: month as any,
                year
            }
        });

        const total_input = sumInput._sum.value == null ? 0 : sumInput._sum.value;  
        const total_output = sumOutput._sum.value == null ? 0 : sumOutput._sum.value; 
  
        if(balanceExist && balanceLastMonthExist) {
            await prisma.balances.update({
                where: {
                    id: balanceExist.id
                },
                data: {
                    value: balanceLastMonthExist.value + total_input - total_output
                }
            });
        }
        
      } else if(valor > 0){
          if(!identifier_2 || !method_2) {
            throw new AppError("Identifier and method are required!", 401);
          }
      }

    return "Ok";
  }
}
