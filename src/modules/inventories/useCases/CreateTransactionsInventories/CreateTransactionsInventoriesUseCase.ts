
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface ICreateTransactionsInventory {
  fk_id_inventory_sequence: string;
  fk_id_client: string;
  description?: string;
  created_at: Date;
  fk_user: number,
  status?: string;
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

export class CreateTransactionsInventoriesUseCase {
  async execute({ fk_id_inventory_sequence, fk_id_client, description, created_at, fk_user, status }: ICreateTransactionsInventory): Promise<any> {

    const data_transaction = new Date(created_at);

    const referencia = fk_id_inventory_sequence.split(" ")[0];
    const ref = (referencia.toString().trim());

    const id_client = Number(fk_id_client.split("-")[0]);



    const equipment_data = await prisma.inventoriesSequence.findMany({
      where: {
        ref,
      },
      select: {
        id: true,
        fk_id_inventory: true,
        inventories: {
          select: {
            id: true,
            unit_cost: true,
          }
        }
      }
    })




    // if (equipment_data.length > 0) {
    //   const id_equipment_sequence = equipment_data[0]?.id

    //   const checkTransaction: any = await prisma.inventoriesTransactions.findMany({
    //     where: {
    //       fk_id_inventory_sequence: +id_equipment_sequence,
    //     },
    //     select: {
    //       client: {
    //         select: {
    //           name: true,
    //         }
    //       }
    //     },
    //   })



    //   if (checkTransaction.length > 0) {
    //     throw new AppError("Reference already exists on  " + checkTransaction[0]?.client?.name, 400)
    //   }

    //   const id_equipment: any = equipment_data[0]?.fk_id_inventory
    // const data_equipament = await prisma.inventories.findMany({
    //   where: {
    //     id: +id_equipment,
    //   },
    //   select: {
    //     id: true,
    //     unit_cost: true,
    //   }
    // })

    //   const valor: any = equipment_data[0]?.inventories?.unit_cost

    //   console.log(id_equipment_sequence, id_client, description, data_transaction, valor, fk_user, status);

    //   await prisma.inventoriesTransactions.create({
    //     data: {
    //       fk_id_inventory_sequence: +id_equipment_sequence,
    //       fk_id_client: +id_client,
    //       description: description,
    //       created_at: data_transaction,
    //       cost: +valor,
    //       fk_user: +fk_user,
    //       alter_at: new Date(),
    //       status: status || 'allocated',

    //     }
    //   });

    //   await prisma.inventoriesSequence.update({
    //     where: {
    //       id: +id_equipment_sequence,
    //     },
    //     data: {
    //       status
    //     }
    //   })

    //   await prisma.logInventories.create({
    //     data: {
    //       fk_id_inventory_sequence: +id_equipment_sequence,
    //       previous_status: 'unallocated',
    //       description,
    //       new_status: 'allocated',
    //       alter_at: new Date(),
    //       created_at: data_transaction,
    //       fk_id_location: +id_client,
    //       fk_id_user: +fk_user
    //     }
    //   })
    // }



    return 'Ok';
  }
}