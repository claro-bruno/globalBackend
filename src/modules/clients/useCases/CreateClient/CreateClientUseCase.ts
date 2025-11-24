import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../middlewares/AppError";
import { hash } from "bcrypt";

interface ICompany {
    name: string;
    sunday: boolean;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    start: string;
    end: string;
    contact?: string;
    contact_phone?: string;
    address?: string;
    email?: string;
}

export class CreateClientUseCase {
    async execute({ name, monday, sunday, tuesday, wednesday, thursday, friday, saturday, start, end, contact, contact_phone, address, email }: ICompany): Promise<any> {
        //validar se o client existe
        const clientExist = await prisma.clients.findFirst({
            where: {
                name
            }
        });

        if (clientExist) {
            throw new AppError('Client already exists', 401)
        }

        // const password = `global${name}1234` ;

        // //criptografar a senha
        // const hashPassword = await hash(password, 10);
        // const username = name.trim().split(" ").join("").toLowerCase();

        // const client_account = await prisma.accounts.create({
        //     data: {
        //         username,
        //         password: hashPassword,
        //         access: "CLIENT",
        //         status: "ACTIVE",
        //         resetPassword: true
        //     }
        // });

        const client = await prisma.clients.create({
            data: {
                name,
                monday,
                sunday,
                tuesday,
                wednesday,
                thursday,
                friday,
                saturday,
                start,
                end,
                email,
                // fk_id_account: client_account.id,
                contact,
                contact_phone,
                address
            }
        });
        return client;
    }
}