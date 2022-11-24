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
      value,
      quarter,
      othersValue: value_others,
      othersDescription: description
    } = payments[0];
  let valor = value == null ? 0 : value;
  if(valor > 0 && identifier != "" && method != "") {
    if (id != null) {
      await prisma.payments.update({
          where: {
            id
          },
          data: {
            value,
            identification: identifier,
            others: +value_others,
            description
          }
        });
      } 
      else 
      {

        await prisma.payments.create({
          data: {
            value,
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
      value: value_2,
      quarter: quarter_2,
      othersValue: value_others_2,
      othersDescription: description_2
    } = payments[1];

    valor = value_2 == null ? 0 : value;
    if(valor > 0 && identifier_2 != "" && method_2 != "") {
      if (id_2 != "") {
        await prisma.payments.update({
            where: {
              id: +id_2
            },
            data: {
              value,
              identification: identifier_2,
              others: +value_others_2,
              description: description_2
            }
          });
        } 
        else 
        {
          await prisma.payments.create({
            data: {
              value,
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
  
        if(balanceExist && balanceLastMonthExist && sumInput._sum.value && sumOutput._sum.value) {
            await prisma.balances.update({
                where: {
                    id: balanceExist.id
                },
                data: {
                    value: balanceExist.value - value
                }
            });
        }
        
      } else if(valor> 0){
          if(identifier_2 == "" || method_2 == "") {
            throw new AppError("Identifier and method are required!", 401);
          }
      }

    return "Ok";
  }
}
