import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateContactDto {
  @IsOptional()
  @IsString()
  userTag?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  customName?: string;
}
