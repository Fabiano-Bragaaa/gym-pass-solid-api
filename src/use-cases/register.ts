import { usersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCasesTypes {
  name: string
  email: string
  password: string
}

export class RegisterUseCases {
  constructor(private usersRepository: usersRepository) {}

  async execute({ name, email, password }: RegisterUseCasesTypes) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error('E-mail already exists.')
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
