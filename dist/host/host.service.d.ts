import { Repository } from 'typeorm';
import { Host } from './host.entity';
import { CreateHostDto } from './createhost.dto';
import { UpdateHostDto } from './updatehost.dto';
export declare class HostService {
    private readonly hostRepository;
    constructor(hostRepository: Repository<Host>);
    findHostByEmail(email: string): Promise<Host | null>;
    createHost(createHostDto: CreateHostDto): Promise<Host>;
    addMultipleHosts(hosts: CreateHostDto[]): Promise<Host[]>;
    findAllHosts(): Promise<Host[]>;
    updateHost(id: number, updateHostDto: UpdateHostDto): Promise<Host>;
    deleteHost(id: number): Promise<void>;
    searchHostsByName(query: string): Promise<Host[]>;
}
