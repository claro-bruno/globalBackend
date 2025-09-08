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

export class GetAllOrdersUseCase {
  async execute() {

    const result = await prisma.orders.findMany({
      where: { id: { gt: 1974 } }
    }

    );
    return result;
  }
}
