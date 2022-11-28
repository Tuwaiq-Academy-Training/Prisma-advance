import { z } from 'zod';

export const getBlogUserSchema = z.object({
  params: z.object({
    userid: z.string({ invalid_type_error: 'Userid must be a string' }),
  }),
});

export type getBlogUserSchemaType = z.infer<typeof getBlogUserSchema>['params'];

export const getBlogDetailsSchema = z.object({
  params: z.object({
    blogid: z.string({ invalid_type_error: 'BlogId must be a string' }),
  }),
});

export const addBlogSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required !' }),
    body: z.string({ required_error: 'Body is required !' }),
    user_id: z.string({ required_error: 'User id is required !' }),
  }),
});

export const updateBlogSchema = z.object({
  params: z.object({
    blogid: z.string({ invalid_type_error: 'Blog id must be a string' }),
  }),
  body: z.object({
    title: z.string({ required_error: 'Title is required !' }),
    body: z.string({ required_error: 'Body is required !' }),
  }),
});

export type updateBlogSchemaType = z.infer<typeof updateBlogSchema>['params'];

export const deleteBlogSchema = z.object({
  params: z.object({
    blogid: z.string({ invalid_type_error: 'blog id must be a string' }),
  }),
});

export type deleteBlogSchemaType = z.infer<typeof deleteBlogSchema>['params'];
