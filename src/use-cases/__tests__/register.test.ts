import { expect, test, describe } from 'vitest'
import { RegisterUseCases } from '../register'
import { compare } from 'bcryptjs'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

describe('Register Use Case', () => {
  test('should has user password upon registration', async () => {
    const usersRepository = new InMemoryUserRepository()
    const registerUserCase = new RegisterUseCases(usersRepository)
    const { user } = await registerUserCase.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
  test('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUserRepository()
    const registerUserCase = new RegisterUseCases(usersRepository)

    const email = 'johndoe@gmail.com'

    await registerUserCase.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    expect(() =>
      registerUserCase.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  test('should be able to register', async () => {
    const usersRepository = new InMemoryUserRepository()
    const registerUserCase = new RegisterUseCases(usersRepository)
    const { user } = await registerUserCase.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
