import { NextFunction, Request, Response } from "express";
import { CompleteJobsUseCase } from "./CompleteJobsUseCase";

export class CompleteJobsController {
  async handle(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;
    const {
      month,
      year,
      value_hour,
      workedDaysInfos,
      quarter,
      status,
      status_payment,
      others
    } = request.body;


    const completeJobsUseCase = new CompleteJobsUseCase();
    const result = await completeJobsUseCase.execute({
      id: +id,
      month,
      year: +year,
      valueHour: +value_hour,
      quarter: +quarter,
      status,
      status_payment,
      workedDaysInfos,
      others: +others
    });

    return response.json(result);
  }
}
