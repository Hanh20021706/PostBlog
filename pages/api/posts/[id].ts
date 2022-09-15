// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { viewPage } from "../../../serverPrisma/post";
import cookie from "cookie";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postId = req.query.id;
  console.log("post id", postId);
  if (req.method === "DELETE") {
    const headerCookie = req.headers.cookie;
    console.log("headerCookie", headerCookie);
    var cookies = cookie.parse(headerCookie || "");
    if (cookies.cookieUser) {
      var codeUser: any = jwt.verify(`${cookies.cookieUser}`, "123456");
      // console.log('codeUser22222222222222' , codeUser);

      // return res.status(200).json(codeUser);
      if (codeUser.dataUser.role == "ADMIN") {
        const post = await prisma.post.delete({
          where: { id: Number(postId) },
        });
        return res.status(200).json("xoa thanh xong");
      } else {
        res.status(404).json("ban khong co quyen xoa");
      }
    }
  } else {
    console.log("Post :");
  }

  if (req.method == "GET") {
    const { id: postId } = req.query;
    const itemPost = await prisma.post.findFirst({
      where: { id: Number(postId) },
      include: {
        user: true,
      },
    });
    return res.json(itemPost);
  }

  if (req.method === "PATCH") {
    const data = req.body;
    const { id: idPost, views } = req.query;
    if (views) {
      const { changeViews } = await viewPage(Number(idPost), Number(views));
      console.log("viewsPage", views);

      return res.status(200).json(changeViews);
    }

    const headerCookie = req.headers.cookie;
    var cookies = cookie.parse(headerCookie || "");
    if (cookies.cookieUser) {
      var codeUser: any = jwt.verify(`${cookies.cookieUser}`, "123456");
      // console.log("cookieUser5555555555555" , codeUser);

      // return res.status(200).json(codeUser);
      if (codeUser.dataUser.role == "ADMIN") {
        if (data) {
          const editPost = await prisma.post.update({
            where: { id: Number(idPost) },
            data: data,
          });

          return res.status(201).json("sua thanh cong");
        }
      } else {
        return res.status(404).json("ban khong co quyen sua");
      }
    }
  }
}
