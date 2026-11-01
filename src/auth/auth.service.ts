import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto) {
    // 1. Check kung existing na ang email
    const existingUser = await this.usersService.findOneByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }

    // 2. I-hash ang password (bawal plain text!)
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // 3. I-save sa database
    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });

    // Wag isama ang password sa response
    const { password: _, ...result } = user;
    return result;
  }

  async login(loginDto: LoginDto) {
    // 1. Hanapin ang user
    const user = await this.usersService.findOneByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 2. I-compare ang password
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 3. Gumawa ng JWT Token
    const payload = { sub: user.userId, email: user.email, role: user.role };
    return {
      message: 'Login successful',
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}