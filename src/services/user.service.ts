/*
Connects to the database using Prisma.
Clean separation of database logic from controllers and routes.
*/

import { PrismaClient, User } from "../../generated/prisma";
const prisma = new PrismaClient();

type createUserInput = {
  username: string,
  email: string,
  password: string
};

export const createUserService = (data: createUserInput): Promise<User> => {
  return prisma.user.create({ data });
}

export const getUsersService = () => {
  return prisma.user.findMany();
}

