import { Host } from './host.entity';
import { HostService } from './host.service';
import { CreateHostDto } from './createhost.dto';
import { UpdateHostDto } from './updatehost.dto';
declare class SuccessResponse<T> {
    message: string;
    data: T;
}
export declare class HostController {
    private readonly hostService;
    constructor(hostService: HostService);
    create(createHostDto: CreateHostDto): Promise<SuccessResponse<Host>>;
    getHosts(search?: string): Promise<SuccessResponse<Host[]>>;
    addMultipleHosts(hosts: CreateHostDto[]): Promise<SuccessResponse<Host[]>>;
    update(id: number, updateHostDto: UpdateHostDto): Promise<SuccessResponse<Host>>;
    delete(id: number): Promise<SuccessResponse<void>>;
    searchHosts(query: string): Promise<SuccessResponse<Host[]>>;
}
export {};
