import prisma from "../lib/prisma";

interface QueryParam {
  [key: string]: QueryParam | string;
}

export const listPostParam = async (page: Number, condion: QueryParam = {}) => {
  const postList = await prisma.post.findMany({
    skip: 3 * (Number(page) || 0),
    take: 3,
    include: {
      user: true,
    },
    where: {
      ...condion,
    },
    orderBy: {
      id: "asc",
    },
  });

  const count = await prisma.post.count({
    where: {
      ...condion,
    },
  });

  return { postList, count };
};

export const getPostsAdmin = async (page: number) => {
  const postList = await prisma.post.findMany({
    skip: 3 * (Number(page) || 0),
    take: 3,
    include: {
      user: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  const count = await prisma.post.count();

  return { postList, count };
};

export const listAllPosts = async () => {
  const listPosts = await prisma.post.findMany({
    take: 5,
    include: {
      user: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  const count = await prisma.post.count();

  return { listPosts, count };
};
export const postById = async (idQuery: number) => {
  const post = await prisma.post.findFirst({
    where: {
      id: Number(idQuery),
    },
  });
  return { post };
};

// list views post
export const listViews = async (views: number) => {
  const listPostView = await prisma.post.findMany({
    skip: 0,
    take: Number(views),
    include: {
      user: true,
    },
    orderBy: {
      views: "desc",
    },
  });

  return { listPostView };
};

// views detail page
export const viewPage = async (idView: number, views: number) => {
  const changeViews = await prisma.post.update({
    where: { id: Number(idView) },
    data: { views: Number(views) + 1 },
    include: {
      user: true,
    },
    
  });
  console.log('changview' ,changeViews);
  
  return { changeViews };
};
