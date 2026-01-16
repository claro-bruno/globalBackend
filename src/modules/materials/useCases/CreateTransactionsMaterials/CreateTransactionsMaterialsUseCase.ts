
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface ICreateTransactionsMaterial {
  fk_id_material: string;
  quantity: number;
  fk_id_output: any;
  fk_id_input: any;
  description: string;
  created_at: Date;
  fk_user: string;
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

export class CreateTransactionsMaterialsUseCase {
  async execute({ fk_id_material, quantity, fk_id_input, fk_id_output, description, created_at, fk_user }: ICreateTransactionsMaterial): Promise<any> {

    const id = Number(fk_id_material.split("-")[0]);

    const data_transaction = new Date(created_at);





    const input_id: any = fk_id_input !== 0 ? fk_id_input.split("-")[0].toString().trim() : 0;
    const output_id: any = fk_id_output !== 0 ? fk_id_output.split("-")[0].toString().trim() : 0;
    const month = toMonthName(new Date(data_transaction).getUTCMonth());
    const year = new Date(data_transaction).getUTCFullYear();



    const res = await prisma.materials.findFirst({
      where: {
        id
      }
    });




    const cost = res?.unit_cost || 0;
    const total = quantity * cost;


    await prisma.materialsTransactions.create({
      data: {
        fk_id_material: +id,
        quantity: +quantity,
        total_cost: +total,
        fk_id_input: +input_id,
        fk_id_output: +output_id,
        description,
        created_at: data_transaction,
        month,
        year,
        fk_user: +fk_user,
        alter_at: new Date()
      }
    });



    return 'Ok';
  }
}