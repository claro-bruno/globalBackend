import { prisma } from "../../../database/prismaClient";
import { AppError } from "../../../middlewares/AppError";
import nodemailer from "nodemailer";

interface IAccountContractor {
  id: number;
  access: string;
  status: string;
}

export class UpdateAccountContractorUseCase {
  async execute({ id, access, status }: IAccountContractor): Promise<any> {
    // if (access !== "ADMIN") {
    //   throw new AppError("Permission Denied", 401);
    // }

    const contractorExist = await prisma.contractors.findFirst({
      where: {
        id
      }
    });

    if (!contractorExist) {
      throw new AppError("Contractor does not exists", 401);
    }

    if (contractorExist) {
      const contractorAccountExist = await prisma.accounts.findFirst({
        where: {
          id: contractorExist.fk_id_account as any
        }
      });

      const contractor = await prisma.contractors.update({
        where: {
          id
        },
        data: {
          status: status as any,
        }
      });
      if (contractorAccountExist) {
        await prisma.accounts.update({
          where: {
            id: contractorAccountExist.id as any
          },
          data: {
            status: status as any,
            access: access as any,
            resetPassword: true,
          }
        });
      }


      // const hostname = "smtp.gmail.com";
      // const username_ = "globaljanitorialcontact@gmail.com";
      // const pass = "oekrrjxmemlnipke";

      // const transporter = nodemailer.createTransport({
      //   host: hostname,
      //   // port: 993,
      //   port: 587,
      //   // secure: false,
      //   requireTLS: true,
      //   auth: {
      //     user: username_,
      //     pass: pass
      //   },
      //   logger: true
      // });

      // const message = {
      //   from: '"Global Janitorial Servives Support" <noreplay@globaljanitorialservices.com>',
      //   to: contractor.email,
      //   subject: "Account Approved",
      //   plain: "Approved Account",
      //   html: `<strong>Your account has been aproved with sucess!<br> Check your login information.</strong>`,
      //   headers: { "x-myheader": "test header" }
      // };
      // transporter.sendMail(message, (err: any, info: any) => {
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     console.log(info);
      //   }
      // });
      return contractor;
    }
  }
}
