import { ConflictException, Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Host } from './host.entity';
import { Role } from '../enum/role.enum'; // Adjusted import path
import { CreateHostDto } from './createhost.dto';
import { UpdateHostDto } from './updatehost.dto';

@Injectable()
export class HostService {
  constructor(
    @InjectRepository(Host)
    private readonly hostRepository: Repository<Host>,
  ) {}

  async findHostByEmail(email: string): Promise<Host | undefined> {
    return this.hostRepository.findOne({ where: { email } });
  }

  async createHost(createHostDto: CreateHostDto): Promise<Host> {
    const { email, name, number, password, roleId } = createHostDto;

    const existingHost = await this.findHostByEmail(email);
    if (existingHost) {
      throw new ConflictException('A host with this email already exists.');
    }

    if (!Object.values(Role).includes(roleId)) {
      throw new NotFoundException(`Role with id ${roleId} not found`);
    }

    const host = this.hostRepository.create({ email, name, number, password, role: roleId });
    try {
      return await this.hostRepository.save(host);
    } catch (error) {
      console.error('Error saving host:', error); // Log the detailed error
      throw new InternalServerErrorException('Error saving host');
    }
  }

  async findAllHosts(): Promise<Host[]> {
    try {
      return this.hostRepository.find();
    } catch (error) {
      console.error('Error finding hosts:', error); // Log the detailed error
      throw new InternalServerErrorException('Error finding hosts');
    }
  }

  async updateHost(id: string, updateHostDto: UpdateHostDto): Promise<Host> {
    const host = await this.hostRepository.findOne({ where: { id: Number(id) } });
    if (!host) {
      throw new NotFoundException(`Host with id ${id} not found`);
    }

    if (updateHostDto.roleId !== undefined) {
      if (!Object.values(Role).includes(updateHostDto.roleId)) {
        throw new NotFoundException(`Role with id ${updateHostDto.roleId} not found`);
      }
    }

    Object.assign(host, { ...updateHostDto, role: updateHostDto.roleId });
    try {
      return this.hostRepository.save(host);
    } catch (error) {
      console.error('Error updating host:', error); // Log the detailed error
      throw new InternalServerErrorException('Error updating host');
    }
  }

  async deleteHost(id: string): Promise<void> {
    try {
      const result = await this.hostRepository.delete(Number(id));
      if (result.affected === 0) {
        throw new NotFoundException(`Host with id ${id} not found`);
      }
    } catch (error) {
      console.error('Error deleting host:', error); // Log the detailed error
      throw new InternalServerErrorException('Error deleting host');
    }
  }
}
