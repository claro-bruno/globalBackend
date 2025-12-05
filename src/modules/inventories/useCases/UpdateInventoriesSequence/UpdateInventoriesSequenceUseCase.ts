
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IUpdateInventory {
  id: number;
  created_at: Date;
  seq: number;
  fk_id_inventory: number;
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

export class UpdateInventoriesSequenceUseCase {




  async execute({ id, created_at, seq, fk_id_inventory, status }: IUpdateInventory) {


    console.log(id, created_at, seq, fk_id_inventory, status)

    const date_inventory = new Date(created_at);
    const reference = `${date_inventory.toLocaleDateString('en', { year: '2-digit' })}-${date_inventory.getMonth() + 1}-${fk_id_inventory}-${seq}`;


    const inventoryExist = await prisma.inventoriesSequence.findFirst({
      where: {
        id,
      }
    });





    if (!inventoryExist) {
      throw new AppError('inventory does not exists', 400)
    }


    const inventoryLogExist = await prisma.inventoriesSequence.findFirst({
      where: {
        ref: reference,
      }
    });

    // console.log(inventoryLogExist)

    // if (inventoryLogExist) {
    //   throw new AppError('inventory already exists', 400)
    // }

    const lastStatus: any = inventoryExist?.status;

    if (lastStatus !== status) {
      await prisma.logInventories.create({
        data: {
          fk_id_inventory_sequence: id,
          previous_status: lastStatus,
          new_status: status,
          created_at: new Date()
        }
      })
    }

    await prisma.inventoriesSequence.update({
      where: {
        id: id
      },
      data: {
        seq: +seq,
        ref: reference,
        year: date_inventory.getFullYear(),
        created_at: date_inventory,
        fk_id_inventory: +fk_id_inventory,
        month: date_inventory.getMonth() + 1,
        status: status
      }
    });



    return 'Ok';
  }
}