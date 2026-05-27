import { AuthService } from './auth.service';
import { CreateHostDto } from 'src/host/createhost.dto';
import { Host } from '../host/host.entity';
import { LoginDto } from './login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createHostDto: CreateHostDto): Promise<Host>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: number;
            name: string;
            email: string;
        };
    }>;
}
