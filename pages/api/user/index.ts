import type { NextApiRequest, NextApiResponse } from "next";

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
