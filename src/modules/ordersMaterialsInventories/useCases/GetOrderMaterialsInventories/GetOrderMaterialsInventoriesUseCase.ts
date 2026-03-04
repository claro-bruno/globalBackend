import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IGetOrderMaterialsInventories {
  id: number;
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

export class GetOrderMaterialsInventoriesUseCase {
  async execute({ id }: IGetOrderMaterialsInventories) {



    let result = await prisma.ordersMaterialsInventories.findFirst({

      where: {
        id,
      },

      include: {
        contractor: true,
        client: true,
        orderInventoriesItems: {
          include: {
            inventoriesSequence: {
              include: {
                inventories: true
              }
            },


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
