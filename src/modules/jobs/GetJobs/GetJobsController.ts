import { NextFunction, Request, Response } from "express";
import { GetJobsUseCase } from "./GetJobsUseCase";

export class GetJobsController {
    async handle(request: Request, response: Response, next: NextFunction)  {

        const { month, year } = request.query;
        const getJobsUseCase = new GetJobsUseCase();
        if(month && year) {
            let result: any = await getJobsUseCase.execute(+year, month as string);
            result = toJson(result);
            // JSON.stringify(result, (_, v) => typeof v === 'bigint' ? v.toString() : v)
            return response.json(result);
        }
        

        


    }
}

function toJson(data: any) {
    if (data !== undefined) {
      let intCount = 0, repCount = 0;
      const json = JSON.stringify(data, (_, v) => {
        if (typeof v === 'bigint') {
          intCount++;
          return `${v}#bigint`;
        }
        return v;
      });
      const res = json.replace(/"(-?\d+)#bigint"/g, (_, a) => {
        repCount++;
        return a;
      });
      if (repCount > intCount) {
        // You have a string somewhere that looks like "123#bigint";
        throw new Error(`BigInt serialization conflict with a string value.`);
      }
      return res;
    }
  }