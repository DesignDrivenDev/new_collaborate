import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    const { name, phone, services, location, company, email, other } =
      await request.body;

    const transport = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      secure: true,
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: process.env.MAIL_USER,
      subject: `Inquiry received from ${name}`,
      html: `<p>Hello Collaborate team,</p>
    <p>New enquiry received, please find the details below:</p>

    <ul>
      <li>
        <p><b>Name</b>: ${name}</p>
      </li>
      <li>
        <p><b>Email</b>: ${email}</p>
      </li>
      <li>
        <p><b>Phone</b>: ${phone}</p>
      </li>
      <li>
        <p><b>Company Name</b>: ${company}</p>
      </li>
      <li>
        <p><b>Location</b>: ${location}</p>
      </li>
      <li>
        <p><b>Services Requested</b>: ${services.join(", ")}</p>
      </li>
      <li>
        <p><b>Other Requirements</b>: ${other && other}</p>
      </li>
    </ul>
    `,
    };

    try {
      await transport.sendMail(mailOptions);
      return response.json({ message: "Success!", status: 200 });
    } catch (err) {
      return response.json({ message: "Failed!", status: 500 });
    }
  } else {
  }
}
