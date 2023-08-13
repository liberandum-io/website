import {
  AnimalMediaType,
  AnimalRelationshipType,
  AnimalSex,
  AnimalSpecies,
  AnimalStatusType,
  Prisma,
} from '@prisma/client';
import { z } from 'zod';

export const GetAnimal = z
  .object({
    id: z.string().cuid(),
  })
  .strict();

export const GetAnimals = z
  .object({
    where: z
      .object({
        notId: z.string().cuid().array().optional(),
        name: z.string().min(1).max(255).optional(),
        distance: z
          .object({
            miles: z.number().min(0).max(100),
            latitude: z.number().min(-90).max(90),
            longitude: z.number().min(-180).max(180),
          })
          .optional(),
        species: z
          .union([
            z.nativeEnum(AnimalSpecies),
            z.nativeEnum(AnimalSpecies).array(),
          ])
          .optional(),
        status: z
          .union([
            z.nativeEnum(AnimalStatusType),
            z.nativeEnum(AnimalStatusType).array(),
          ])
          .optional(),
        sex: z
          .union([
            z.nativeEnum(AnimalSex),
            z.nativeEnum(AnimalSex).array(),
          ])
          .optional(),
        source: z.string().url().array().optional(),
        sourcePrefix: z.string().min(6).max(255).optional(),
        breed: z.union([
          z.string().min(1).max(255),
          z.string().min(1).max(255).array(),
        ]).optional(),
        colour: z.union([
          z.string().min(1).max(255),
          z.string().min(1).max(255).array(),
        ]).optional(),
        medicalNeeds: z.union([
          z.boolean(),
          z.enum(['true', 'false']),
        ]).optional(),
        friendlyToCats: z.union([
          z.boolean(),
          z.enum(['true', 'false']),
        ]).optional(),
        friendlyToDogs: z.union([
          z.boolean(),
          z.enum(['true', 'false']),
        ]).optional(),
        friendlyToHumans: z.number().min(0).max(30).optional(),
      })
      .optional(),
    orderBy: z
      .object({
        createdAt: z.nativeEnum(Prisma.SortOrder),
      })
      .optional(),
    take: z.number().min(1).max(1000).optional(),
    skip: z.number().min(0).optional(),
  })
  .optional();
export type GetAnimalsSchema = z.infer<typeof GetAnimals>;

export const UpsertAnimal = z
  .object({
    name: z.string().min(1).max(255).optional(),
    species: z.nativeEnum(AnimalSpecies),
    subtitle: z.string().min(1).max(255).optional(),
    description: z.string().min(1).optional(),
    status: z.nativeEnum(AnimalStatusType),
    sex: z.nativeEnum(AnimalSex).optional(),
    breed: z.string().min(1).max(255).optional(),
    source: z.string().url().optional(),
    colour: z.string().min(1).max(255).optional(),
    medicalNeeds: z.boolean().optional(),
    friendlyToCats: z.boolean().optional(),
    friendlyToDogs: z.boolean().optional(),
    friendlyToHumans: z.number().min(0).max(30).optional(),
    locationName: z.string().min(1).max(255).optional(),
    locationLat: z.number().min(-90).max(90).optional(),
    locationLng: z.number().min(-180).max(180).optional(),
    dateOfBirth: z.date().optional(),
    relationships: z
      .object({
        partnerId: z.string().cuid().optional(),
        userId: z.string().cuid().optional(),
        type: z.nativeEnum(AnimalRelationshipType),
      })
      .strict()
      .array()
      .optional(),
    images: z.object({
      name: z.string().optional(),
      url: z.string().url(),
      source: z.string(),
    }).array().optional(),
  })
  .strict();
export type UpsertAnimalSchema = z.infer<typeof UpsertAnimal>;

export const DeleteAnimal = z
  .object({
    id: z.string().cuid(),
  })
  .strict();

export const CreateAnimalMedia = z
  .object({
    animalId: z.string().cuid(),
    name: z.string().min(1).optional(),
    source: z.string().url().optional(),
    fileName: z.string().min(1),
    type: z.nativeEnum(AnimalMediaType),
    dataType: z.enum(['URL', 'BASE64']),
    data: z.string().min(1),
  })
  .strict();

export const DeleteAnimalMedia = z
  .object({
    id: z.string().cuid(),
  })
  .strict();
