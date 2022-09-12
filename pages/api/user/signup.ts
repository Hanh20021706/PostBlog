import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "./../../../lib/prisma";
const bcrypt = require("bcrypt");
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const user = req.body;
    console.log("user", user);
    // ma hoa password
    const slat = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, slat);

    // check email
    const emailUser = await prisma.user.findFirst({
      where:{
        email: user.email
      }
    })
    if(emailUser){
      return res.json('email da ton tai')
    }

    // add user
    const userList = await prisma.user.create({
      data: user,
    });
    console.log(userList);
    return res.status(201).json({ message: "user crate" });
  } catch (error) {
    console.log("fale");
  }
}
