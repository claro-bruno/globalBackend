
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface ICreateMaterial {
  name: string;
  description?: string;
  unit_cost: number;
  url_image?: string;
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

export class CreateMaterialsUseCase {




  async execute({ name, description, unit_cost, url_image }: ICreateMaterial) {




    await prisma.materials.create({
      data: {
        name,
        description,
        unit_cost,
        url_image
      }
    });



    return 'Ok';
  }
}