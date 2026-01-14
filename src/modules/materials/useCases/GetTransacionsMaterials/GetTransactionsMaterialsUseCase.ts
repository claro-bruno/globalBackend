
import { prisma } from "../../../../database/prismaClient";


export class GetTransactionsMaterialsUseCase {
    async execute() {
        const result = await prisma.materialsTransactions.findMany({
            orderBy: [{ created_at: 'desc' }],

            select: {
                id: true,
                created_at: true,
                fk_id_material: true,
                fk_id_input: true,
                fk_id_output: true,
                quantity: true,
                total_cost: true,
                description: true,
                fk_user: true,
                month: true,
                year: true,
                users: {
                    select: {
                        first_name: true,
                    }
                },
                output: {
                    select: {
                        name: true,

                    }
                },
                input: {
                    select: {
                        name: true,
                    }
                },
                material: {
                    select: {
                        name: true,
                        unit_cost: true,
                    }
                },

            }
        });
        return result;


    }
}