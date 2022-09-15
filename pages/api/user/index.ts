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
      return res.json({ message: "log out" });
    }
  } catch (error) {
    console.log("error");
  }
}
