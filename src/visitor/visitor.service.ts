// src/visitor/visitor.service.ts

import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Visitor } from './visitor.entity';
import { CreateVisitorDto } from './createVisitor.dto';
import { UpdateVisitorDto } from './updateVisitor.dto';
import * as moment from 'moment';

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
    const {
      visitorName,
      companyName,
      email,
      number,
      purposeOfVisit,
      hostName,
      visitorImage,
    } = createVisitorDto;

    const existingVisitor = await this.findVisitorByEmail(email);
    // if (existingVisitor) {
    //   throw new ConflictException('A visitor with this email already exists.');
    // }

    const visitor = this.visitorRepository.create({
      visitorName,
      companyName,
      email,
      number,
      purposeOfVisit,
      hostName,
      visitorImage,
      checkInTime: new Date(),
    });

    try {
      return await this.visitorRepository.save(visitor);
    } catch (error) {
      console.error('Error saving visitor:', error);
      throw new InternalServerErrorException('Error saving visitor');
    }
  }

  async findAllVisitors(): Promise<Visitor[]> {
    try {
      return await this.visitorRepository.find();
    } catch (error) {
      console.error('Error finding visitors:', error);
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

  async updateVisitor(
    id: string,
    updateVisitorDto: UpdateVisitorDto,
  ): Promise<Visitor> {
    const visitor = await this.visitorRepository.findOne({
      where: { id: Number(id) },
    });
    if (!visitor) {
      throw new NotFoundException(`Visitor with id ${id} not found`);
    }

    Object.assign(visitor, updateVisitorDto);

    try {
      return this.visitorRepository.save(visitor);
    } catch (error) {
      console.error('Error updating visitor:', error);
      throw new InternalServerErrorException('Error updating visitor');
    }
  }

  async deleteVisitor(id: string): Promise<void> {
    try {
      const visitor = await this.visitorRepository.findOne({
        where: { id: Number(id) },
      });
      if (!visitor) {
        throw new NotFoundException(`Visitor with id ${id} not found`);
      }
      await this.visitorRepository.delete(Number(id));
    } catch (error) {
      console.error('Error deleting visitor:', error);
      throw new InternalServerErrorException('Error deleting visitor');
    }
  }

  async updateCheckInTime(id: number): Promise<Visitor> {
    const visitor = await this.visitorRepository.findOne({ where: { id } });
    if (!visitor) {
      throw new NotFoundException(`Visitor with id ${id} not found`);
    }
    visitor.checkInTime = new Date();
    return this.visitorRepository.save(visitor);
  }

  async updateCheckOutTime(id: number): Promise<Visitor> {
    const visitor = await this.visitorRepository.findOne({ where: { id } });
    if (!visitor) {
      throw new NotFoundException(`Visitor with id ${id} not found`);
    }
    visitor.checkOutTime = new Date();
    return this.visitorRepository.save(visitor);
  }

  parseDate(dateString: string): Date | null {
    if (!dateString) return null;
  
    // Attempt to parse with format: DD-MM-YYYY HH:mm
    const parsed = moment(dateString, 'DD-MM-YYYY HH:mm', true);
    return parsed.isValid() ? parsed.toDate() : null;
  }

  async bulkInsertVisitors(visitors: CreateVisitorDto[]): Promise<Visitor[]> {
    const savedVisitors: Visitor[] = [];
  
    for (const visitorData of visitors) {
      const {
        visitorName,
        companyName,
        email,
        number,
        purposeOfVisit,
        hostName,
        visitorImage,
        checkInTime,
        checkOutTime,
      } = visitorData;
  
      // 🚫 Skip if all fields are blank
      if (
        !visitorName?.trim() &&
        !email?.trim() &&
        !number?.trim() &&
        !companyName?.trim() &&
        !purposeOfVisit?.trim()
      ) {
        continue;
      }
  
      // ✅ Fix: parse and use parsed check-in/out times
      const parsedCheckInTime = this.parseDate(checkInTime as string);
      const parsedCheckOutTime = this.parseDate(checkOutTime as string);
  
      const newVisitor = this.visitorRepository.create({
        visitorName,
        companyName,
        email,
        number,
        purposeOfVisit,
        hostName,
        visitorImage,
        checkInTime: parsedCheckInTime,
        checkOutTime: parsedCheckOutTime,
      });
  
      try {
        const saved = await this.visitorRepository.save(newVisitor);
        savedVisitors.push(saved);
      } catch (error) {
        console.error(`❌ Error saving visitor (${email || 'no-email'}):`, error);
        // Optional: continue or throw
      }
    }
  
    console.log('✅ Visitors saved in bulk:', savedVisitors.length);
    return savedVisitors;
  }
  
}
  

