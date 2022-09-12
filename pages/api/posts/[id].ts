// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { viewPage } from "../../../serverPrisma/post";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postId = req.query.id;
  console.log("post id", postId);
  if (req.method === "DELETE") {
    const post = await prisma.post.delete({
      where: { id: Number(postId) },
    });
    return res.json(post);
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
    console.log("viewpage", views);

    console.log("data", data);
    console.log("id post", idPost);
    if (views) {
      const { changeViews } = await viewPage(Number(idPost), Number(views));
      console.log("viewsPage", views);

      return res.status(200).json(changeViews);
    }
    if (data) {
      const editPost = await prisma.post.update({
        where: { id: Number(idPost) },
        data: data,
      });

      return res.status(201).json(editPost);
    }
  }
}
