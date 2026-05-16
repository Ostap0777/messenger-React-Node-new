import { PartialType } from '@nestjs/mapped-types';
import { CreateContactDto } from './create-contact.dto';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateContactDto extends PartialType(CreateContactDto) {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  customName?: string;
}
