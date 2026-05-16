import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { RegisterDto } from './dto/register.dro';
import { LoginDto } from './dto/login.dto';

export interface JwtPayload {
  sub: string;
  email: string | null;
}
export interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string | null;
    userTag: string | null;
    avatar: string | null;
  };
}

const SALT_ROUNDS = 12;

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
  ) {}
  async register(dto: RegisterDto): Promise<AuthResponse> {
    const existing = await this.users.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Email is already in use');
    }

    const passwordHash = await bcrypt.hash(dto.password, SALT_ROUNDS);
    const user = await this.users.create({
      name: dto.name,
      email: dto.email,
      password: passwordHash,
    });

    return this.buildAuthResponse(user);
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    const user = await this.users.findByEmail(dto.email);
    if (!user) {
      throw new ConflictException('Invalid credential');
    }

    const passwordMaches = await bcrypt.compare(dto.password, user.password);
    if (!passwordMaches) {
      throw new ConflictException('Incorrect password');
    }
    return this.buildAuthResponse(user);
  }

  private buildAuthResponse(user: User): AuthResponse {
    const payload: JwtPayload = { sub: user.id, email: user.email };
    const accessToken = this.jwt.sign(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userTag: user.userTag,
        avatar: user.avatar,
      },
    };
  }
}
