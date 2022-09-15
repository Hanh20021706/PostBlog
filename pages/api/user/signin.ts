import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "./../../../lib/prisma";
import { deleteCookie, setCookie } from "cookies-next";
import cookie from "cookie";
import jwt from "jsonwebtoken";
const bcrypt = require("bcrypt");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = req.body;
  console.log(user);
  if (req.method === "POST") {
    const dataUser = await prisma.user.findFirst({
      where: {
        email: user.email,
      },
    });

    //  kiem tra user
    if (!user) {
      return res.status(401 ).json({
        message: "Khong co tai khoan nay",
      });
    }

    // check password cua user
    const match = await bcrypt.compare(user.password, dataUser?.password);
    if (match == false) {
      return res.status(401).json({
        message: "password khong dung",
      });
    }

    //  su dung jwt
    const token = jwt.sign({ dataUser }, "123456", { expiresIn: "12h" });

    // check user va password khop nhau moi cho dang nhap
    if (dataUser && match == true) {
      setCookie("cookieUser", token, {
        req,
        res,
        maxAge: 60 * 60 * 24 * 1,
        // time cookie
      });
      res.setHeader("user", token);
    }

    return res.status(200).json("dang nhap tai khoan thanh cong");
  }

  if (req.method === "GET") {
    const infoUser = req.headers.cookie;

    var cookies = cookie.parse(infoUser || "");
    // console.log("code cookie", cookies.cookieUser);

    if (cookies.cookieUser) {
      var codeUser = jwt.verify(`${cookies.cookieUser}`, "123456");

      return res.status(200).json(codeUser);
    } else {
      return res.status(401).json({ message: "het han cookie" });
    }
  }
}
