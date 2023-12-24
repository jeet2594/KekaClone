import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class UniqueValuePipe implements PipeTransform {
  constructor(private readonly repository: Repository<any>) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    if (!metadata.metatype || !metadata.data) {
      return value;
    }

    const { entity, property } = Reflect.getMetadata(
      'unique',
      metadata.metatype,
    );

    if (!entity || !property) {
      return value;
    }

    const foundEntity = await this.repository.findOne({ [property]: value });

    if (foundEntity) {
      throw new BadRequestException(
        `${entity} with this ${property} already exists.`,
      );
    }

    return value;
  }
}
