import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

// function md5(str) {
//   const hash = crypto.createHash('md5');
//   hash.update(str);
//   return hash.digest('hex');
// }

@Injectable()
export class UserService {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  private logger = new Logger();

  async register(registerDto: RegisterDto) {
    this.logger.log('进入注册接口');

    // 获取用户，看是否存在，存在即报错
    const foundUser = await this.userRepository.findOneBy({
      username: registerDto.username,
    });
    console.log(foundUser);

    if (foundUser) {
      throw new HttpException('用户已存在', HttpStatus.OK);
    }

    const newUser = new User();
    newUser.username = registerDto.username;

    const salt = bcrypt.genSaltSync(10);
    newUser.password = bcrypt.hashSync(registerDto.password, salt);

    console.log(newUser);

    try {
      await this.userRepository.save(newUser);
      return '注册成功';
    } catch (e) {
      this.logger.error(e);
      throw new HttpException('注册失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async login(loginDto: LoginDto) {
    const foundUser = await this.userRepository.findOneBy({
      username: loginDto.username,
    });
    if (!foundUser) {
      throw new HttpException('用户名不存在', HttpStatus.OK);
    }

    // if (foundUser.password !== md5(loginDto.password)) {
    //   throw new HttpException('密码错误', HttpStatus.OK);
    // }
    if (bcrypt.compareSync(foundUser.password, loginDto.password)) {
      throw new HttpException('密码错误', HttpStatus.OK);
    }

    return foundUser;
  }
}
