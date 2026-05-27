import { Injectable, ConflictException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Host } from './host.entity';
import { CreateHostDto } from './createhost.dto';
import { UpdateHostDto } from './updatehost.dto';

@Injectable()
export class HostService {
  constructor(
    @InjectRepository(Host)
    private readonly hostRepository: Repository<Host>,
  ) {}

  async findHostByEmail(email: string): Promise<Host | null> {
    return this.hostRepository.findOne({ where: { email } });
  }

  async createHost(createHostDto: CreateHostDto): Promise<Host> {
    const { email, name, number, password, designation } = createHostDto;

    const existingHost = await this.findHostByEmail(email);
    if (existingHost) {
      throw new ConflictException('A host with this email already exists.');
    }

    const host = this.hostRepository.create({ email, name, number, password, designation });
    try {
      return await this.hostRepository.save(host);
    } catch (error) {
      console.error('Error saving host:', error);
      throw new InternalServerErrorException('Error saving host');
    }
  }

  // ✅ Cleaned up bulk upload to only return data
  async addMultipleHosts(hosts: CreateHostDto[]): Promise<Host[]> {
    try {
      return await this.hostRepository.save(hosts);
    } catch (error) {
      console.error('Error saving multiple hosts:', error);
      throw new InternalServerErrorException('Bulk save failed');
    }
  }

  async findAllHosts(): Promise<Host[]> {
    try {
      return this.hostRepository.find();
    } catch (error) {
      console.error('Error finding hosts:', error);
      throw new InternalServerErrorException('Error finding hosts');
    }
  }

  async updateHost(id: number, updateHostDto: UpdateHostDto): Promise<Host> {
    const host = await this.hostRepository.findOne({ where: { id } });
    if (!host) {
      throw new NotFoundException(`Host with id ${id} not found`);
    }

    Object.assign(host, updateHostDto);
    try {
      return await this.hostRepository.save(host);
    } catch (error) {
      console.error('Error updating host:', error);
      throw new InternalServerErrorException('Error updating host');
    }
  }

  async deleteHost(id: number): Promise<void> {
    try {
      const result = await this.hostRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Host with id ${id} not found`);
      }
    } catch (error) {
      console.error('Error deleting host:', error);
      throw new InternalServerErrorException('Error deleting host');
    }
  }
  async searchHostsByName(query: string): Promise<Host[]> {
    if (!query || query.length < 2) return [];
  
    return this.hostRepository.find({
      where: {
        name: ILike(`%${query}%`), // Case-insensitive partial match
      },
      take: 10,
    });
  }
}
