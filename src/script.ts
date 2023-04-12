import { prisma } from './database/prismaClient';
import nodemailer from "nodemailer";
import { AppError } from "../src/middlewares/AppError";
import { hash } from "bcrypt";

const sendEmail = async(email: string) => {
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
          ("0" + (birthday.getDate() + 1)).slice(-2).toString();
  
        // const firstName = contractorExist.first_name.split(" ").toString();
        // console.log(firstName.split(",").toString());
        // const password = contractorExist.first_name[0].toLowerCase().split(" ")[0].toString() + ("0" + (birthday.getMonth() + 1)).slice(-2).toString() + ("0" + (birthday.getDate())).slice(-2).toString();
  
        //criptografar a senha
        const hashPassword = await hash(password, 10);
  
        await prisma.accounts.update({
          where: {
            id: contractorAccountExist.id as any
          },
          data: {
            resetPassword: true,
            password: hashPassword
          }
        });
    // const contractors  = await prisma.contractors.findMany({
    //     where: {
    //         status: 'ACTIVE'
    //     },
    //     include: {
    //         account: true,
    //     }
    // })
    // let emails = "";
    // contractors.forEach((element: any) => {
    //     emails =  emails + element.email + ';';
    // });
    // console.log(emails);

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
    const text = `<strong>Account Info Account <br></strong><br> 
    Your Login: ${contractorAccountExist.username}<br>
    Your Password: ${password}<br>
    website: https://globaljanitorialservicesapp.netlify.app
    If you want to recover your login or password, use the link Recover on the main page.

    Thanks.`;
    const message = {
        from: '"Global Janitorial Servives Support" <noreplay@globaljanitorialservices.com>',
        to: email,
        cc: 'giovanna@globaljanitorialservices.com',
        // cco: emails,
        subject: "Account Global",
        plain: "Accout Info Account",
        html: text,
        headers: { "x-myheader": "test header" }
    };
    transporter.sendMail(message);
}
}


const setContractors = async() => {
  const contractors = await prisma.contractors.findMany({
    where: {
      status: "ACTIVE",
      account: {
        access: 'CONTRACTOR',
      }
    },
    include: {
      account: true,
    }
  });

  await contractors.reduce(async (memo: any, info) => {
    await memo;
    setTimeout(function() {
      sendEmail(info?.email)
    }, 45000)
  }, undefined);
}




sendEmail('brunaugusto@gmail.com')
// sendEmail('yhennypino@gmail.com')
// sendEmail('alejandr30183@hotmail.com')
// sendEmail('carla_mazotti@hotmail.com')
// sendEmail('milenamunoz@gmail.com')
// sendEmail('emilioureta@gmail.com')
// sendEmail('semenderecoo@gmail.com')
// sendEmail('nurielyspuentes22@gmail.com')
// sendEmail('lorehmed2@gmail.com')
// sendEmail('Semendereco@gmail.com')
//setContractors()
