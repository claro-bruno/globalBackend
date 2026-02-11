import { prisma } from "../../../database/prismaClient";
import { AppError } from "../../../middlewares/AppError";
import { hash } from "bcrypt";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

interface IAccountContractor {
  email: string;
}

export class ResetPasswordContractorUseCase {
  async execute({ email }: IAccountContractor): Promise<any> {

    const contractorExist = await prisma.contractors.findFirst({
      where: {
        email,
        status: "ACTIVE"
      }
    });
    if (!contractorExist) {
      throw new AppError("Email does not exists", 401);
    }

    const contractorAccountExist = await prisma.accounts.findFirst({
      where: {
        id: contractorExist.fk_id_account as any
      }
    });


    if (contractorAccountExist) {
      const birthday = contractorExist.dob;

      // const username = contractorExist.first_name[0].toLowerCase() + contractorExist.last_name + birthday.getFullYear().toString();
      const password =
        contractorExist.first_name.toString() +
        ("0" + (birthday.getMonth() + 1)).slice(-2).toString() +
        ("0" + (birthday.getDate())).slice(-2).toString();
      // const firstName = contractorExist.first_name.split(" ").toString();
      // console.log(firstName.split(",").toString());
      // const password = contractorExist.first_name[0].toLowerCase().split(" ")[0].toString() + ("0" + (birthday.getMonth() + 1)).slice(-2).toString() + ("0" + (birthday.getDate())).slice(-2).toString();

      console.log(password, contractorAccountExist?.id)
      //criptografar a senha
      const hashPassword = await hash(password, 10);

      await prisma.accounts.update({
        where: {
          id: contractorAccountExist?.id as any
        },
        data: {
          resetPassword: true,
          password: hashPassword
        }
      });

      const hostname = "smtp.gmail.com";
      const username = "globaljanitorialcontact@gmail.com";
      const pass = "oekrrjxmemlnipke";
      const transporter = nodemailer.createTransport({
        host: hostname,
        // port: 993,
        port: 587,
        // secure: false,
        requireTLS: true,
        auth: {
          user: username,
          pass: pass
        },
        logger: true
      });

      const message = {
        from: '"Global Janitorial Servives Support" <noreplay@globaljanitorialservices.com>',
        to: contractorExist.email,
        subject: "Reset Password",
        plain: "Reset Pasword Account",
        html: `<strong>Your password account has been reseted to <br> Login: ${contractorAccountExist.username} <br> Password: ${password}</strong>`,
        headers: { "x-myheader": "test header" }
      };
      console.log(message)
      transporter.sendMail(message);
    }

    return "Your username and password has been sent to your email";
  }
}
