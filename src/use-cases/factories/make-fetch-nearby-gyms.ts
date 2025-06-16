import { FetchNearByGymUseCase } from '../fetch-nerby-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function MakeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new FetchNearByGymUseCase(gymsRepository)

  return useCase
}
