import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { registerUseCases } from '@/use-cases/register'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBody = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, name, password } = registerBody.parse(request.body)

  try {
    await registerUseCases({ name, email, password })
  } catch (err) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
