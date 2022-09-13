import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { deleteCookie, setCookie } from "cookies-next";
import cookie from "cookie";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dataUser = req.body;
  console.log(dataUser);
  try {
    if (req.method === "GET") {
      // const infoUser = req.headers.cookie
      // var cookies = cookie.parse(infoUser || '')
      return res.json({ message: "log out" });
    }
  } catch (error) {
    console.log("error");
  }
}
