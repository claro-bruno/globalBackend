
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IUpdateInventory {
  id: number;
  created_at: Date;
  fk_id_inventory: number;
  fk_user: number;
  seq: number;
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




  async execute({ id, created_at, fk_id_inventory, fk_user, seq }: IUpdateInventory) {



    const date_inventory = new Date(created_at);
    // const reference = `${date_inventory.toLocaleDateString('en', { year: '2-digit' })}-${date_inventory.getMonth() + 1}-${fk_id_inventory}-${seq}`;

    // console.log('update inventories sequence use case', date_inventory);

    const inventoryExist = await prisma.inventoriesSequence.findFirst({
      where: {
        id,
      }
    });


    if (!inventoryExist) {
      throw new AppError('inventory does not exists', 400)
    }



    const sequenceExist = await prisma.inventoriesSequence.findMany({
      where: {
        seq: +seq,
        fk_id_inventory: +fk_id_inventory,
      }
    });


    if (+sequenceExist[0].id !== +id) {
      throw new AppError('inventory sequence already exists', 400)

    }



    // let inventoryCount;
    // if (inventoryExist.fk_id_inventory !== +fk_id_inventory) {
    //   inventoryCount = await prisma.inventoriesSequence.aggregate({
    //     _count: {
    //       id: true,
    //     },
    //     where: {
    //       fk_id_inventory: +fk_id_inventory,
    //     },
    //   });

    // }

    // const seq = (inventoryCount?._count?.id || 0) + 1;

    const ref = `${date_inventory.toLocaleDateString('en', { year: '2-digit' })}-${date_inventory.getMonth() + 1}-${fk_id_inventory}-${seq}`;
    // console.log(inventoryLogExist)

    // if (inventoryLogExist) {
    //   throw new AppError('inventory already exists', 400)
    // }

    // const lastStatus: any = inventoryExist?.status;

    // if (lastStatus !== status) {
    //   await prisma.logInventories.create({
    //     data: {
    //       fk_id_inventory_sequence: id,
    //       previous_status: lastStatus,
    //       new_status: status,
    //       created_at: new Date()
    //     }
    //   })
    // }

    await prisma.inventoriesSequence.update({
      where: {
        id: id
      },
      data: {
        seq: +seq,
        ref: ref,
        year: date_inventory.getFullYear(),
        created_at: date_inventory,
        fk_id_inventory: +fk_id_inventory,
        month: date_inventory.getMonth() + 1,
        fk_user: +fk_user,
        alter_at: new Date(),
      }
    });



    return 'Ok';
  }
}