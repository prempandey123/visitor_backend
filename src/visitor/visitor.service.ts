import { Injectable, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Visitor } from './visitor.entity';
import { CreateVisitorDto } from './createVisitor.dto';
import { UpdateVisitorDto } from './updateVisitor.dto';

@Injectable()
export class VisitorService {
  constructor(
    @InjectRepository(Visitor)
    private readonly visitorRepository: Repository<Visitor>,
  ) {}

  async findVisitorByEmail(email: string): Promise<Visitor | undefined> {
    return this.visitorRepository.findOne({ where: { email } });
  }

  async createVisitor(createVisitorDto: CreateVisitorDto): Promise<Visitor> {
    const { visitorName, companyName, email, number, purposeOfVisit, hostName } = createVisitorDto;

    const existingVisitor = await this.findVisitorByEmail(email);
    if (existingVisitor) {
      throw new ConflictException('A visitor with this email already exists.');
    }

    const visitor = this.visitorRepository.create({ visitorName, companyName, email, number, purposeOfVisit, hostName });
    try {
      return await this.visitorRepository.save(visitor);
    } catch (error) {
      console.error('Error saving visitor:', error); // Log the detailed error
      throw new InternalServerErrorException('Error saving visitor');
    }
  }

  async findAllVisitors(): Promise<Visitor[]> {
    try {
      return this.visitorRepository.find();
    } catch (error) {
      console.error('Error finding visitors:', error); // Log the detailed error
      throw new InternalServerErrorException('Error finding visitors');
    }
  }

  async findOne(id: number): Promise<Visitor> {
    const visitor = await this.visitorRepository.findOne({ where: { id } });
    if (!visitor) {
      throw new NotFoundException(`Visitor with id ${id} not found`);
    }
    return visitor;
  }

  async updateVisitor(id: string, updateVisitorDto: UpdateVisitorDto): Promise<Visitor> {
    const visitor = await this.visitorRepository.findOne({ where: { id: Number(id) } });
    if (!visitor) {
      throw new NotFoundException(`Visitor with id ${id} not found`);
    }

    Object.assign(visitor, updateVisitorDto);
    try {
      return this.visitorRepository.save(visitor);
    } catch (error) {
      console.error('Error updating visitor:', error); // Log the detailed error
      throw new InternalServerErrorException('Error updating visitor');
    }
  }

  async deleteVisitor(id: string): Promise<void> {
    try {
      const result = await this.visitorRepository.delete(Number(id));
      if (result.affected === 0) {
        throw new NotFoundException(`Visitor with id ${id} not found`);
      }
    } catch (error) {
      console.error('Error deleting visitor:', error); // Log the detailed error
      throw new InternalServerErrorException('Error deleting visitor');
    }
  }
}
