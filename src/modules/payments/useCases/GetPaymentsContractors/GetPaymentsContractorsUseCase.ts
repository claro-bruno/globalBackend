import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

function toJson(data: any) {
  if (data !== undefined) {
    return JSON.stringify(data, (_, v) =>
      typeof v === "bigint" ? `${v}#bigint` : v
    ).replace(/"(-?\d+)#bigint"/g, (_, a) => a);
  }
}

export class GetPaymentsContractorsUseCase {
  async execute(year: number, month: string) {

    return prisma.invoicesContractors.findMany({
      where: {
        month,
        year
      },
      select: {
        id: true,
        quarter: true,
        total: true,
        contractor: {
          select: {
            first_name: true,
            middle_name: true,
            last_name: true,
            clientContractor: {
              select: {
                identification: true,
                name: true,
              }
            }
          }
        }
      }

    });

  }
}
