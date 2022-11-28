import express from 'express';
import {
  addBlog,
  deleteBlog,
  getAllBlog,
  getBlogDetails,
  getBlogUser,
  updateBlog,
} from '../controller/blog.controller';
import validate from '../middleware/validate';
import {
  addBlogSchema,
  deleteBlogSchema,
  getBlogDetailsSchema,
  getBlogUserSchema,
  updateBlogSchema,
} from '../zod_schema/blog.schema';

const router = express.Router();

// Get all blogs
router.get('/', getAllBlog);
router.get('/user/:userid', validate(getBlogUserSchema), getBlogUser);
router.get('/details/:blogid', validate(getBlogDetailsSchema), getBlogDetails);
router.post('/', validate(addBlogSchema), addBlog);
router.put('/:blogid', validate(updateBlogSchema), updateBlog);
router.delete('/:blogid', validate(deleteBlogSchema), deleteBlog);

export default router;
