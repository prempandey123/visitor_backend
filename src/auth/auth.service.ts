// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { Host } from '../host/host.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { HostService } from '../host/host.service';
import { CreateHostDto } from '../host/createhost.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Host)
    private hostRepository: Repository<Host>,
    private jwtService: JwtService,
    private hostService: HostService, // Added to use findHostByEmail
  ) {}

  async register(createHostDto: CreateHostDto): Promise<Host> {
    const newHost = this.hostRepository.create(createHostDto);
    return this.hostRepository.save(newHost);
  }

  async validateUser(email: string, password: string): Promise<Host | null> {
    const host = await this.hostService.findHostByEmail(email);
    if (host && host.password === password) {
      return host;
    }
    return null;
  }

  async login(host: Host) {
    const payload = { email: host.email, sub: host.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: host.id,
        name: host.name,
        email: host.email,
      },
    };
  }
}
