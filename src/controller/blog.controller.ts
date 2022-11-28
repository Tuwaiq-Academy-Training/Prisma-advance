import { Blog } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Request, Response } from 'express';
import { prisma } from '../config/db';
import {
  deleteBlogSchemaType,
  getBlogUserSchemaType,
  updateBlogSchemaType,
} from '../zod_schema/blog.schema';

export const getAllBlog = async (req: Request, res: Response) => {
  //:TODO Complete try catch
  const blogs = await prisma.blog.findMany();
  return res.status(200).json(blogs);
};

export const getBlogUser = async (req: Request, res: Response) => {
  //:TODO Complete this endpoint
  const { userid } = req.params as getBlogUserSchemaType;
  const userBlogs = await prisma.blog.findMany({
    where: {
      user_id: userid,
    },
  });

  if (userBlogs.length == 0) {
    return res.status(400).json({
      message: "This user doesn't have any blogs",
    });
  }

  return res.status(200).json(userBlogs);
};

export const getBlogDetails = async (req: Request, res: Response) => {
  //:TODO Complete this endpoint
  const { blogid } = req.params;

  const blog = await prisma.blog.findUnique({
    where: { id: blogid },
    select: {
      title: true,
      body: true,
      user: {
        select: {
          username: true,
          email: true,
          userDetails: {
            select: {
              fullName: true,
            },
          },
        },
      },
    },
    // include: {
    //   user: {
    //     include: {
    //       userDetails: true,
    //     },
    //   },
    // },
  });

  return res.status(200).json(blog);
};

export const addBlog = async (req: Request, res: Response) => {
  //:TODO Complete this endpoint
  const newBlog = req.body as Blog;

  try {
    await prisma.blog.create({
      data: newBlog,
    });
    res.status(201).json({
      message: 'New blog created !',
    });
  } catch (error) {
    const prismaError = error as PrismaClientKnownRequestError;
    res.status(400).json({
      message: prismaError.message,
    });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  //:TODO Complete this endpoint
  const updatedBlog = req.body as Blog;
  const { blogid } = req.params as updateBlogSchemaType;

  await prisma.blog.update({
    where: { id: blogid },
    data: updatedBlog,
  });
  res.status(200).json({ message: 'Blog updated !' });
};

export const deleteBlog = async (req: Request, res: Response) => {
  //:TODO Complete this endpoint
  const { blogid } = req.params as deleteBlogSchemaType;
  await prisma.blog.delete({
    where: { id: blogid },
  });
  res.status(200).json({
    message: 'Blog deleted !',
  });
};
