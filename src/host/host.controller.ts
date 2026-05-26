import { Controller, Post, Body, Get, Patch, Param, Delete, ConflictException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
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
    try {
      const host = await this.hostService.createHost(createHostDto);
      return { message: 'Host created successfully', data: host };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException('A host with this email already exists.');
      } else if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        console.error('Error creating host:', error); // Log the detailed error
        throw new InternalServerErrorException('Error creating host');
      }
    }
  }

  @Get()
  async findAll(): Promise<SuccessResponse<Host[]>> {
    try {
      const hosts = await this.hostService.findAllHosts();
      return { message: 'Hosts retrieved successfully', data: hosts };
    } catch (error) {
      console.error('Error finding hosts:', error); // Log the detailed error
      throw new InternalServerErrorException('Error finding hosts');
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateHostDto: UpdateHostDto): Promise<SuccessResponse<Host>> {
    try {
      const host = await this.hostService.updateHost(id, updateHostDto);
      return { message: 'Host updated successfully', data: host };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Host with id ${id} not found`);
      } else {
        console.error('Error updating host:', error); // Log the detailed error
        throw new InternalServerErrorException('Error updating host');
      }
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<SuccessResponse<void>> {
    try {
      await this.hostService.deleteHost(id);
      return { message: 'Host deleted successfully', data: null };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Host with id ${id} not found`);
      } else {
        console.error('Error deleting host:', error); // Log the detailed error
        throw new InternalServerErrorException('Error deleting host');
      }
    }
  }
}
