import { Controller, Post, Body, Get, Patch, Param, Delete, Query } from '@nestjs/common';
import { Host } from './host.entity';
import { HostService } from './host.service';
import { CreateHostDto } from './createhost.dto';
import { UpdateHostDto } from './updatehost.dto';

class SuccessResponse<T> {
  message: string;
  data: T;
}

@Controller('hosts')
export class HostController {
  constructor(private readonly hostService: HostService) {}

  @Post()
  async create(@Body() createHostDto: CreateHostDto): Promise<SuccessResponse<Host>> {
    const host = await this.hostService.createHost(createHostDto);
    return { message: 'Host created successfully', data: host };
  }

  @Get()
async getHosts(@Query('search') search?: string): Promise<SuccessResponse<Host[]>> {
  if (search && search.length >= 2) {
    const results = await this.hostService.searchHostsByName(search);
    return {
      message: 'Matching hosts retrieved successfully',
      data: results,
    };
  } else {
    const hosts = await this.hostService.findAllHosts();
    return {
      message: 'All hosts retrieved successfully',
      data: hosts,
    };
  }
}


  // ✅ Rename route to match frontend
  @Post('bulk-upload')
  async addMultipleHosts(@Body('hosts') hosts: CreateHostDto[]): Promise<SuccessResponse<Host[]>> {
    const savedHosts = await this.hostService.addMultipleHosts(hosts);
    return { message: 'Hosts saved successfully', data: savedHosts };
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateHostDto: UpdateHostDto): Promise<SuccessResponse<Host>> {
    const host = await this.hostService.updateHost(id, updateHostDto);
    return { message: 'Host updated successfully', data: host };
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<SuccessResponse<void>> {
    await this.hostService.deleteHost(id);
    return { message: 'Host deleted successfully', data: null };
  }
  @Get('search')
  async searchHosts(@Query('query') query: string): Promise<SuccessResponse<Host[]>> {
    const results = await this.hostService.searchHostsByName(query);
    return {
      message: 'Matching hosts retrieved successfully',
      data: results,
    };
  }
  
}
