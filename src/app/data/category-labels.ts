import { CarType, IssueCategory } from '@/generated/prisma'

export const CATEGORY_LABELS: Record<IssueCategory, string> = {
  ENGINE: 'Engine',
  TRANSMISSION: 'Transmission',
  BRAKES: 'Brakes',
  SUSPENSION: 'Suspension',
  STEERING: 'Steering',
  ELECTRICAL: 'Electrical',
  INFOTAINMENT: 'Infotainment',
  BATTERY: 'Battery',
  BODY: 'Body',
  RUST: 'Rust',
  AIR_CONDITIONING: 'Air Conditioning',
  SAFETY: 'Safety',
  NOISE: 'Noise',
  FUEL_SYSTEM: 'Fuel System',
  COOLING: 'Cooling',
  OTHER: 'Other',
}

export const CAR_TYPE_LABELS: Record<CarType, string> = {
  SEDAN: 'Sedan',
  SUV: 'SUV',
  HATCHBACK: 'Hatchback',
  COUPE: 'Coupe',
  CONVERTIBLE: 'Convertible',
  WAGON: 'Wagon',
  UTE: 'Ute',
  VAN: 'Van',
  PEOPLE_MOVER: 'People Mover',
}