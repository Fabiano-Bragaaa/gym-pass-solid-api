import fastify from 'fastify'
import { PrismaClient } from 'generated/prisma'

export const app = fastify()

const prisma = new PrismaClient()

prisma.user.create({
  data: {
    name: 'Fabiano',
    email: 'fabianobraga@gmail.com',
  },
})
