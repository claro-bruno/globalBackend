import { prisma } from './database/prismaClient';
import nodemailer from "nodemailer";

const sendEmail = async() => {
    const contractors  = await prisma.contractors.findMany({
        where: {
            status: 'ACTIVE'
        },
        include: {
            account: true,
        }
    })
    
    await contractors.reduce(async (memo: any, info) => {
        await memo;
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
            to: info.email,
            subject: "Account Global",
            plain: "Accout Info Account",
            html: `<strong>Account Info Account <br></strong><br> 
            Check your last email to check your login and password <br>
            website: https://globaljanitorialservicesapp.netlify.app
            `,
            headers: { "x-myheader": "test header" }
        };
        setTimeout(function() {
            console.log("Aqui executamos algo!")
            transporter.sendMail(message);
        }, 10000)
        
        
      }, undefined);
}

sendEmail()