
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface ICreateInventory {
  created_at: Date;
  seq: number;
  fk_id_inventory: number;
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

export class CreateInventoriesSequenceUseCase {




  async execute({ created_at, seq, fk_id_inventory }: ICreateInventory) {




    const date_inventory = new Date(created_at);

    const reference = `${date_inventory.toLocaleDateString('en', { year: '2-digit' })}-${date_inventory.getMonth() + 1}-${fk_id_inventory}-${seq}`;


    const inventoryExist = await prisma.inventoriesSequence.findFirst({
      where: {
        ref: reference,
      }
    });

    if (inventoryExist) {
      throw new AppError('inventory already exists', 400)
    }


    await prisma.inventoriesSequence.create({
      data: {
        seq: +seq,
        ref: reference,
        year: date_inventory.getFullYear(),
        created_at: date_inventory,
        fk_id_inventory: +fk_id_inventory,
        month: date_inventory.getMonth() + 1,
      }
    });



    return 'Ok';
  }
}