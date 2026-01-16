
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface ICreateMaterial {
  name: string;
  description?: string;
  unit_cost: any;
  url_image?: string;
  status?: string;
  category?: string;
  fk_user?: any;
  created_at?: any;
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




  async execute({ name, description, unit_cost, url_image, category, fk_user, created_at }: ICreateMaterial) {

    // name, description, unit_cost, url_image, status
    const date_created = new Date(created_at);
    await prisma.materials.create({
      data: {
        name,
        description,
        unit_cost: +unit_cost,
        url_image,
        category,
        fk_user,
        created_at: date_created
      }
    });



    return 'Ok';
  }
}