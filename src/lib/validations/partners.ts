import { PartnerType } from '@prisma/client';
import { z } from 'zod';

export const CreatePartner = z
  .object({
    name: z.string(),
    image: z.string().optional(),
    description: z.string().optional(),
    type: z.nativeEnum(PartnerType),
    subtitle: z.string().optional(),
    locationName: z.string().optional(),
    locationLat: z.number().optional(),
    locationLng: z.number().optional(),
    website: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    parentId: z.string().optional(),
    // branches?: PartnerUncheckedCreateNestedManyWithoutParentInput
    // animalRelationship?: AnimalRelationshipUncheckedCreateNestedManyWithoutPartnerInput
    // partnerRelationship?: PartnerRelationshipUncheckedCreateNestedManyWithoutPartnerInput
  })
  .strict();

export type CreatePartnerSchema = z.infer<typeof CreatePartner>;
