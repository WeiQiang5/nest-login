import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  @Matches(/^[a-zA-Z0-9#$%_]+$/, {
    message: '用户名只能是字母，数字或者#$%这些字符',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 30)
  password: string;
}
