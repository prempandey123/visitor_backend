import { Host } from '../host/host.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { HostService } from '../host/host.service';
import { CreateHostDto } from '../host/createhost.dto';
export declare class AuthService {
    private hostRepository;
    private jwtService;
    private hostService;
    constructor(hostRepository: Repository<Host>, jwtService: JwtService, hostService: HostService);
    register(createHostDto: CreateHostDto): Promise<Host>;
    validateUser(email: string, password: string): Promise<Host | null>;
    login(host: Host): Promise<{
        access_token: string;
        user: {
            id: number;
            name: string;
            email: string;
        };
    }>;
}
