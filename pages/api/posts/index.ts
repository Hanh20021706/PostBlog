// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getCookie } from "cookies-next";
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
import { verify } from "crypto";

interface QueryParam {
  [key: string]: QueryParam | string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const post = req.body;
  if (req.method === "POST") {
    const headersCookie = req.headers.cookie;

    console.log("headercooke", headersCookie);
    if (!headersCookie) return res.status(401);
    const cookieParsed = cookie.parse(headersCookie);
    console.log("cookieVetify", cookieParsed);

    const userToken = cookieParsed["cookieUser"];
    console.log("userToken", userToken);

    console.log('role ', post.dataUser.role);
    

    console.log("post add", post);
    const postAdd = await prisma.post.create({
      data: post,
    });

    console.log("post add item", postAdd);
    return res.status(201).json({ message: "post crate" });
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
    `                                                         `;
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
