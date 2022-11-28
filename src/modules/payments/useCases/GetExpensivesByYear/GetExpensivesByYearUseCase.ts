import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";

interface IGetExpensives {
    year: number;
}

export class GetExpensivesByMonthUseCase {
    async execute({ year }:IGetExpensives) {
        let result: any = [];

        const arrTypes: any = [
            "INPUT",
            "LABOUR_PAYROOL",
            "VAN_FUEL_OIL",
            "FUEL_OIL",
            "EQUIPMENT",
            "ADVERTISEMENT",
            "UNIFORM",
            "REPAIRS_MAINTENANCE",
            "OFFICE_EXPENSES",
            "MEALS",
            "CONTRACTOR",
            "CONTRACTOR_WORKERS",
            "CHEMICAL_CONSUMABLES",
            "INSURANCE_TAX",
            "EXTRAS",
            "GLOBAL"
        ];

        const arrMonths: any = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        const result_balance = await prisma.balances.groupBy({
            by: ['month'],
            _sum: {
                value: true
            },
            where: {
                year
            }
        });

        // const res = await prisma.payments.groupBy({
        //     by: ['month'],
        //     _sum: {
        //         value: true
        //     },
        //     where: {
        //         year
        //     }
        // });
        // let retorno: any = {};
        // if(res.length > 0) {
        //     res.forEach(async (item: any) => {
        //         retorno = await prisma.payments.groupBy({
        //             by: ['type', 'month'],
        //             _sum: {
        //                 value: true
        //             },
        //             where: {
        //                 year,
        //                 month: item.month
        //             }
        //         });
        //         result.push(retorno);
        //     });
        // }

        // const result_totals = await prisma.payments.groupBy({
        //     by: ['type'],
        //     _sum: {
        //         value: true
        //     },
        //     where: {
        //         year
        //     }
        // });

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

        const resTypes = await prisma.payments.groupBy({
            by: ['type'],
            _sum: {
                value: true
            },
            where: {
                year
            }
        });

        const resusltMonthOutput = await prisma.payments.groupBy({
            by: ['month'],
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


        const resultt: any = {};
        arrTypes.forEach((type: string) => {
            const payments_type = resTypes.find(
                (info: any) => info.type === type
              );
              resultt[`${type}`] = typeof payments_type === 'undefined' || payments_type === null ? 0 : payments_type._sum.value as any;

        });

        const resultt_monts: any = [];
        await arrMonths.reduce(async (memo: any, infoMonth: string) => {
            await memo;
            const result: any = {};
            const res: any = {};
            const result_month = resusltMonthOutput.find(
                (info: any) => info.month === infoMonth
            );

            
            const retorno = await prisma.payments.groupBy({
                by: ['type'],
                _sum: {
                    value: true
                },
                where: {
                    year,
                    month: infoMonth
                }
            });

            let month_result: any = [];
            // let objMonth: any = {};
            if(retorno.length > 0) {
                arrTypes.forEach((element: string) => {
                    const objMonth: any = {};
                    const result_each_month = retorno.find(
                        (info: any) => info.type === element
                    );
                    objMonth.value = typeof result_each_month === 'undefined' || result_each_month === null ? 0 : result_each_month._sum.value as any;
                    objMonth.type = element;
                    month_result.push(objMonth);
                });
            } else {
                month_result = [
                    {
                        type: 'INPUT',
                        value: 0
                    },
                    {
                        type: 'LABOUR_PAYROOL',
                        value: 0
                    },
                    {
                        type: 'VAN_FUEL_OIL',
                        value: 0
                    },
                    
                    {
                        type: 'FUEL_OIL',
                        value: 0
                    },
                    {
                        type: 'EQUIPMENT',
                        value: 0
                    },
                    {
                        type: 'ADVERTISEMENT',
                        value: 0
                    },
                    {
                        type: 'UNIFORM',
                        value: 0
                    },
                    
                    {
                        type: 'REPAIRS_MAINTENANCE',
                        value: 0
                    },
                    {
                        type: 'OFFICE_EXPENSES',
                        value: 0
                    },
                    {
                        type: 'MEALS',
                        value: 0
                    },
                    {
                        type: 'CONTRACTOR',
                        value: 0
                    },
                    {
                        type: 'CONTRACTOR_WORKERS',
                        value: 0
                    },
                    {
                        type: 'CHEMICAL_CONSUMABLES',
                        value: 0
                    },
                    
                    {
                        type: 'INSURANCE_TAX',
                        value: 0
                    },

                    {
                        type: 'EXTRAS',
                        value: 0 
                    },
                    {
                        type: 'GLOBAL',
                        value: 0
                    }
                ];
            }

            
            res.month = month_result;
            res.total = typeof result_month === 'undefined' || result_month === null ? 0 : result_month._sum.value as any;

            result[`${infoMonth}`] = res;
            resultt_monts.push(result);
        }, undefined);

        const total_input = sumInput._sum.value == null ? 0 : sumInput._sum.value;
        const total_output = sumOutput._sum.value == null ? 0 : sumOutput._sum.value;
        const total_contractor = sumContractorsWorkers._sum.value == null ? 0 : sumContractorsWorkers._sum.value;
        

        return {
            total: resultt,
            yearReports: resultt_monts,
            total_input,
            total_output,
            total_contractor,
        };



       
    }
}