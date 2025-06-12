import { expect, test, describe, beforeEach, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

import { ValidateCheckInUseCase } from '../validate-check-in'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let validateCheckInRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check in Use Case', () => {
  beforeEach(async () => {
    validateCheckInRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(validateCheckInRepository)

    // vi.useFakeTimers()
  })

  afterEach(() => {
    // vi.useRealTimers()
  })

  test('should be able to validate the check in', async () => {
    const createdCheckIn = await validateCheckInRepository.create({
      gymId: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(validateCheckInRepository.items[0].validated_at).toEqual(
      expect.any(Date),
    )
  })

  test('should be not able to validate an inexistent the check in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'ixexistent-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
