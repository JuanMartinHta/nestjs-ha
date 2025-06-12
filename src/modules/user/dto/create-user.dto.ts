import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { Role } from 'src/common/decorators/roles.decorator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  role: Role;
}
