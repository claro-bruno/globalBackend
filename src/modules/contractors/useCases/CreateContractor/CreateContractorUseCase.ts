import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";
import { AppError } from "../../../../middlewares/AppError";
import nodemailer from "nodemailer";

interface ICreateContractor {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  identification: string;
  ein?: string;
  dob: Date;
  telephone: string;
  acceptTerms: boolean;
  urlPrimaryResidencyProof: string;
  urlSecondaryResidencyProof: string;
  urlDocumentProof: string;
  urlProfile: string;
}

interface ICreateContractorAddress {
  address: string;
  city: string;
  zipcode: string;
  state: string;
}

export class CreateContractorUseCase {
  async execute(
    {
      firstName,
      middleName,
      lastName,
      email,
      identification,
      ein,
      dob,
      telephone,
      acceptTerms,
      urlPrimaryResidencyProof,
      urlSecondaryResidencyProof,
      urlDocumentProof,
      urlProfile
    }: ICreateContractor,
    { address, city, zipcode, state }: ICreateContractorAddress,
    {
      address2 = "",
      city2 = "",
      zipcode2 = "",
      state2 = ""
    }: ICreateContractorAddress | any
  ): Promise<any> {
    

    // validar se o contractor existe
    const contractorExist = await prisma.contractors.findUnique({
      where: {
        email: email.toLowerCase()
      }
    });

    if (contractorExist) {
      throw new AppError("Email already exists", 400);
    }

    const birthday = new Date(dob);
    const username =
      firstName[0].toLowerCase() + lastName + birthday.getFullYear().toString();
    const password =
      firstName.split(" ")[0].toString() +
      ("0" + (birthday.getMonth() + 1)).slice(-2).toString() +
      ("0" + (birthday.getDate() + 1)).slice(-2).toString();

    //criptografar a senha
    const hashPassword = await hash(password, 10);
    //salvar a contractor account

    const contractor_account = await prisma.accounts.create({
      data: {
        username,
        password: hashPassword,
        access: "CONTRACTOR",
        status: "ACTIVE"
      }
    });

    const contractor = await prisma.contractors.create({
      data: {
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        email,
        acceptTerms,
        ein,
        status: "ACTIVE",
        urlProfile,
        urlDocumentProof,
        urlPrimaryResidencyProof,
        urlSecondaryResidencyProof,
        identification,
        dob: birthday,
        telephone,
        fk_id_account: contractor_account.id
      }
    });

    const addr1 = await prisma.adresseses.create({
      data: {
        address,
        city,
        zipcode,
        state,
        fk_id_contractor: contractor.id
      }
    });

    const addr2 =
      address2 != ""
        ? await prisma.adresseses.create({
            data: {
              address: address2,
              city: city2,
              zipcode: zipcode2,
              state: state2,
              fk_id_contractor: contractor.id
            }
          })
        : undefined;

    const hostname = "smtp.gmail.com";
    const username_ = "globaljanitorialcontact@gmail.com";
    const pass = "oekrrjxmemlnipke";

    const transporter = nodemailer.createTransport({
      host: hostname,
      // port: 993,
      port: 587,
      // secure: false,
      requireTLS: true,
      auth: {
        user: username_,
        pass: pass
      },
      logger: true
    });

    const message = {
      from: '"Global Janitorial Servives Support" <noreplay@globaljanitorialservices.com>',
      to: email,
      subject: "Welcome to Global Janitorial Services",
      plain: "Registration Account",
      html: `<strong>Your account has been created with sucess!<br> <br> Your login information: <br> Login: ${username} <br> Password: ${password}</strong>`,
      headers: { "x-myheader": "test header" }
    };
    // Your account will be revised and soon will be aproved
    transporter.sendMail(message, (err: any, info: any) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
    // Login: ${username} <br> Password: ${password}
    return { username, password };
  }
}
