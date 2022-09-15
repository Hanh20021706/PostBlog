// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "./../../../lib/prisma";
import jwt from "jsonwebtoken";

import cookie from "cookie";
import {
  getPostsAdmin,
  listAllPosts,
  listPostParam,
  listViews,
} from "../../../serverPrisma/post";

interface QueryParam {
  [key: string]: QueryParam | string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const post = req.body;
  if (req.method === "POST") {
    const headerCookie = req.headers.cookie;
    var cookies = cookie.parse(headerCookie || "");
    if (cookies.cookieUser) {
      var codeUser:any = jwt.verify(`${cookies.cookieUser}`, "123456");
      if (codeUser.dataUser.role == "ADMIN") {
        const postAdd = await prisma.post.create({
          data: {
            categories: post.categories,
            title: post.title,
            content: post.content,
            image: post.image,
            userId: codeUser.dataUser.id,
          },
        });
        console.log("postAdd", postAdd);

        return res.status(201).json("them thanh cong");
      } else {
        return res.status(404).json("ban khong co quyen");
      }
    }
  } else {
    console.log("error");
  }
  if (req.method === "GET") {
    const { title, categories, page, listPost, viewsPage } = req.query;

    // list post`
    if (listPost) {
      const { listPosts, count } = await listAllPosts();
      return res.status(200).json({ listPosts, count });
    }

    // list views
    if (viewsPage) {
      const { listPostView } = await listViews(Number(viewsPage));
      return res.status(200).json({ listPostView });
    }
    //vay cai user dau
    // get categories and title
    if (categories != "undefined" || title != "undefined") {
      const condion = displayPost(String(title), String(categories));
      const { postList, count } = await listPostParam(Number(page), condion);

      return res.status(200).json({ postList, count });
    } else {
      const { postList, count } = await getPostsAdmin(Number(page));
      return res.status(200).json({ postList, count });
    }
  } else {
    console.log("sai roi nha");
  }
}

const displayPost = (title: string, categories: string) => {
  console.log("search item", title);

  let condion: QueryParam = {};

  if (title == "undefined") {
    condion = {
      ...condion,
    };
  } else {
    condion = {
      ...condion,
      title: {
        contains: title,
        mode: "insensitive",
      },
    };
  }

  if (categories == "undefined") {
    condion = {
      ...condion,
    };
  } else {
    condion = {
      ...condion,
      categories: categories,
    };
  }
  return condion;
};
