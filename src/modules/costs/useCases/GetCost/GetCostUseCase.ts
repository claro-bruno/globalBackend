import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface ICost {
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
  // console.log(monthNumber)
  return date.toLocaleString("en-US", {
    month: "long"
  });
}

export class GetCostUseCase {
  async execute({ id }: ICost) {

    let result = await prisma.costs.findFirst({
      where: {
        id,
      },
    });



    return result;
  }
}
