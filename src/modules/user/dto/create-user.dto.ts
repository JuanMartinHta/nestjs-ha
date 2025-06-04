import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { Role } from 'src/common/decorators/roles.decorator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  role: Role;
}
