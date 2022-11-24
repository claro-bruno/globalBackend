import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IGetExpensives {
    year: number;
}

export class GetExpensivesByMonthUseCase {
    async execute({ year }:IGetExpensives) {
        let result: any = [];

        const result_balance = await prisma.balances.groupBy({
            by: ['month'],
            _sum: {
                value: true
            },
            where: {
                year
            }
        });

        const res = await prisma.payments.groupBy({
            by: ['month'],
            _sum: {
                value: true
            },
            where: {
                year
            }
        });
        let retorno: any = {};
        if(res.length > 0) {
            res.forEach(async (item: any) => {
                retorno = await prisma.payments.groupBy({
                    by: ['type'],
                    _sum: {
                        value: true
                    },
                    where: {
                        year,
                        month: item.month
                    }
                });
                result.push(retorno);
            });
        }

        const result_totals = await prisma.payments.groupBy({
            by: ['type'],
            _sum: {
                value: true
            },
            where: {
                year
            }
        });

        const sumOutput = await prisma.payments.aggregate({
            _sum: {
                value: true
            },

            where: {
                year,
                NOT: {
                    type: {
                        equals: 'INPUT' as any
                    }
                }
            }
        });

        const sumContractorsWorkers = await prisma.payments.aggregate({
            _sum: {
                value: true
            },

            where: {
                year,
                type: 'CONTRACTOR_WORKERS'
            }
        });

        const sumInput = await prisma.payments.aggregate({
            _sum: {
                value: true
            },

            where: {
                year,
                type: 'INPUT' as any
            }
        });

        const total_input = sumInput._sum.value == null ? 0 : sumInput._sum.value;
        const total_output = sumOutput._sum.value == null ? 0 : sumOutput._sum.value;
        const total_contractor = sumContractorsWorkers._sum.value == null ? 0 : sumContractorsWorkers._sum.value;
        return {
            payments_by_month: result,
            payments_totals_by_type: result_totals,
            balances_by_month: result_balance,
            total_input,
            total_output,
            total_contractor
        };



       
    }
}