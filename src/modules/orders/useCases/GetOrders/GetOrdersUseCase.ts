import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IService {
    year: number;
    month: string;
  }


function getMonthFromString(mon: string) {
    var d = Date.parse(mon + "1, 2023");
    if (!isNaN(d)) {
      return new Date(d).getMonth() + 1;
    }
    return -1;
  }
  
  function toMonthName(monthNumber: number) {
    const date = new Date();
    date.setMonth(monthNumber);
    // console.log(monthNumber)
    return date.toLocaleString("en-US", {
      month: "long"
    });
  }

export class GetOrdersUseCase {
  async execute({year, month}: IService){
      
        let ret: any = []
        let result = await prisma.orders.findMany({
            orderBy: [
            {
                id: "asc"
            }],
            include: {
                ordersContractors: 
                { 
                    include: 
                    { 
                        contractor: true 
                    } 
                },
                client: true
            }
        });

        result.forEach((i: any) => {
            const dt = new Date(i?.created_at)
            
            const fullYear = dt.getUTCFullYear();
            const fullMonth = dt.getUTCMonth() + 1;
            const fullMonthLiteral = toMonthName(fullMonth-1);
            if(fullMonthLiteral === month && fullYear === year) {
                ret.push(i)
            }
            
        })
        
        return ret;
    }
}
