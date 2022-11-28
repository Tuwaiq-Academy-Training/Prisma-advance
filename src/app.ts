import express from 'express';
import blogRoute from './routes/blog.route';
import userRoute from './routes/user.route';
import 'dotenv/config';
import { connectDB } from './config/db';

const app = express();

// Methods
connectDB();

// Middleware
app.use(express.json());
app.use('/api/v1/blog', blogRoute);
app.use('/api/v1/user', userRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Server is running in port : ' + PORT);
});
