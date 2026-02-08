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
  return date.toLocaleString("en-US", {
    month: "long"
  });
}

export class GetAllOrdersMaterialsInventoriesUseCase {
  async execute() {

    let result = await prisma.ordersMaterialsInventories.findMany({

      orderBy: [
        {
          id: "asc"
        }],

      include: {
        contractor: true,
        client: true,
        orderInventoriesItems: {
          include: {
            inventoriesSequence: true
          }
        },
        orderMaterialsItems: {
          include: {
            material: true
          }
        }
      }
    });
    return result;
  }
}
