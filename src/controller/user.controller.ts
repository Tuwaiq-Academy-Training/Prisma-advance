import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { prisma } from '../config/db';

export const getAllUsers = async (req: Request, res: Response) => {
  //:TODO Complete this endpoint
  const users = await prisma.user.findMany();
  res.status(200).json(users);
};

export const login = async (req: Request, res: Response) => {
  //:TODO Complete this endpoint
  const { username, password } = req.body as User;

  const isValid = await prisma.user.findFirst({
    where: {
      username,
      password,
    },
  });

  if (!isValid) {
    return res.status(401).json({
      message: 'Wrong username or password',
    });
  }
  return res.status(200).json({
    message: 'Welcome back !',
  });
};

export const register = async (req: Request, res: Response) => {
  //:TODO Complete this endpoint
  const newUser = req.body as User;

  await prisma.user.create({
    data: newUser,
  });
  res.status(201).json({
    message: 'New user created !',
  });
};
