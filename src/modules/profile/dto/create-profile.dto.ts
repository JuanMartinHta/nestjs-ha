import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProfileDto {
  @IsOptional()
  id: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  bio: string;
}
