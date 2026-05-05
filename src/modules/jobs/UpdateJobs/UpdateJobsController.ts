import { NextFunction, Request, Response } from "express";
import { UpdateJobsUseCase } from "./UpdateJobsUseCase";


export class UpdateJobsController {
    async handle(request: Request, response: Response, next: NextFunction) {
        const { id } = request.params;
        const { id_client, id_contractor, sunday, monday, tuesday, wednesday, thursday, friday, saturday, start, end } = request.body;
        // const fk_id_client = isNaN(id_client) ? id_client.split("-")[0] : id_client;
        // console.log("ID_CLIENT:", id_client);
        const updateJobsUseCase = new UpdateJobsUseCase();
        const result = await updateJobsUseCase.execute({
            id: +id,
            id_contractor: +id_contractor,
            id_client: +id_client,
            sunday,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            start,
            end
        });

        return response.json(result);


    }
}