import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest, { params }: any) {
  const { title, name, email, phone, desc, cvUrl } = await request.json();

  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    secure: true,
  });

  const mailData = {
    from: process.env.MAIL_USER,
    to: process.env.MAIL_USER,

    subject: `Job Application for ${title}`,
    html: `<p>Hello</p>
    <p>${name} has applied for the position of ${title}.</p>
    <p>The details regarding the application are as follows:</p>
    <p>Background: ${desc}</p>
    <p>CV: <a target="_blank" href=${cvUrl}> Link </a> </p>
    <p>The contact details of the applicant are as follows:</p>
    <p>Contact Number: ${phone} </p>
    <p>Contact Email: ${email} </p>

    <p> Regards, </p>
    <p> Collaboorate Solutions</p>
    `,
  };

  try {
    await transporter.sendMail(mailData);
    return NextResponse.json({ message: "Success!", status: 200 });
  } catch (err) {
    if (err) console.log(err);
    return NextResponse.json({ message: "Failed!", status: 500 });
  }
}
