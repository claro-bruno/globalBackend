import { prisma } from './database/prismaClient';
import nodemailer from "nodemailer";
import e from 'express';

const sendEmail = async() => {
    const contractors  = await prisma.contractors.findMany({
        where: {
            status: 'ACTIVE'
        },
        include: {
            account: true,
        }
    })
    let emails = "";
    contractors.forEach((element: any) => {
        emails =  emails + element.email + ';';
    });
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

    const message = {
        from: '"Global Janitorial Servives Support" <noreplay@globaljanitorialservices.com>',
        to: 'alan@globaljanitorialservices.com',
        cco: emails,
        subject: "Account Global",
        plain: "Accout Info Account",
        html: `<strong>Account Info Account <br></strong><br> 
        Check your last email to check your login and password <br>
        website: https://globaljanitorialservicesapp.netlify.app
        If you want to recover your login or password, use the link Recover on the main page.

        Thanks.
        `,
        headers: { "x-myheader": "test header" }
    };
    transporter.sendMail(message);
}

sendEmail()