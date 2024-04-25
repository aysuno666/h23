const express = require("express");
const nodemailer = require("nodemailer");

const server = express();

server.use(express.static(__dirname + '/public'));
server.use(express.json());

server.get("*", (req, res) => {
  res.sendFile("public/index.html", { root: __dirname });
});

server.post("/api/feedback", async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "partsa660@gmail.com",
        pass: "dcbo dtau akky nawu",
      },
    });

    const { name, phone, email } = req.body;

    await transporter.sendMail({
      from: "ООО 'AutoParts' <partsa660@gmail.com",
      to: "partsa660@gmail.com",
      subject: 'Новая заявка',
      text: email,
      html: `
      <table>
      <tbody>
          <tr>
              <td colspan="2"> <h1>Новая заявка</h1></td>
          </tr>
          <tr>
              <td>Имя:</td>
              <td> ${name}</td>
          </tr>
          <tr>
              <td> Телефон: </td>
              <td> ${phone}</td>
          </tr>
          <tr>
              <td> Почта: </td>
              <td> ${email}</td>
          </tr>
      </tbody>
     </table>
        `,
    });

    return res.status(200).send({ status: 200, message: "Success" });
  } catch (e) {
    return res
      .status(500)
      .send({ status: 500, message: "Internal server error" });
  }
});

server.listen(3000, () => {
  console.log(`App listening on port 3000:`);
});