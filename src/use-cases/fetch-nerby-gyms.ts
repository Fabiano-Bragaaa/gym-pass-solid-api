import { Gym } from 'generated/prisma'
import { GymsRepository } from '@/repositories/gyms-repository'

interface FetchNearByGymUseCaseTypes {
  userLatitude: number
  userLongitude: number
}

interface FetchNearByGymUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearByGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearByGymUseCaseTypes): Promise<FetchNearByGymUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearBy({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}
