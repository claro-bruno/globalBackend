import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

export class GetPaymentContractorDetailsUseCase {
  async execute(id: number) {

    const result_payment = await prisma.payments.findUnique({ where: { id} })
    if(result_payment) {
      const { year, month, quarter, fk_id_contractor, value, others }  = result_payment;

      const result: any = await prisma.$queryRaw`
        SELECT
			    j.id,
			    c.name,
			    q.value_hour,
          SUM(ap.value) AS total_hours,
			    SUM(ap.value*q.value_hour) AS total
          FROM appointments ap
          INNER JOIN quarters q ON q.id = ap.fk_id_quarter
          INNER JOIN jobs j ON j.id = q.fk_id_job
          INNER JOIN clients c ON c.id = j.fk_id_client
          WHERE  q.year = ${year} AND q.month = ${month} AND j.fk_id_contractor = ${fk_id_contractor} AND j.status = 'ACTIVE' AND q.order = ${quarter}
          GROUP BY j.id,q.value_hour,c.name
          ORDER BY c.name
        ;`;

      const result_contractor = await prisma.contractors.findUnique(
        { 
          where: {id},
          include: {
            clientContractor: true,
          }
        },
      );
      
      return {
        data_invoice: result,
        data_contractor: result_contractor,
        totals: {
          total: value, 
          total_others: others
        }
      }
    } 
    return [];
  }
}