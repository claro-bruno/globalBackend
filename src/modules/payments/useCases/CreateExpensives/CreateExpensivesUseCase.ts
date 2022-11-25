import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface ICreateExpensive {
    date_expensive: Date;
    value: number;
    payed_for: string;
    identifier?: string;
    type: string;
    method: string;
    status: string;
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

export class CreateExpensivesUseCase {
    async execute({ date_expensive, payed_for, value, method, identifier, type, status  }: ICreateExpensive) {
        let balanceLastMonthExist: any = {};
    
        const month = toMonthName(new Date(date_expensive).getMonth()+1);
        const year  = new Date(date_expensive).getFullYear();
        
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
                }});
            }
        }

        let valor = value == null ? 0 : value;
        if(valor > 0 && identifier != "" && method != "") {

            await prisma.payments.create({
                data: {
                  value,
                  method: method as any,
                  type: type as any,
                  year: +year,
                  month,
                  identification: identifier,
                  date_at: new Date(date_expensive),
                  payed_for, 
                  status: status as any
                }
              });
            
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
        return 'Ok';
    }
}