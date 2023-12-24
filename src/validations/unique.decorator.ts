import { SetMetadata } from '@nestjs/common';

export const Unique = (entity: string, property: string) =>
  SetMetadata('unique', { entity, property });
