import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCases } from '../register'

export function MakeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const registerUseCases = new RegisterUseCases(usersRepository)

  return { registerUseCases }
}
