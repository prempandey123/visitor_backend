import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { VisitorService } from './visitor.service';

import { Visitor } from './visitor.entity';
import { CreateVisitorDto } from './createVisitor.dto';
import { UpdateVisitorDto } from './updateVisitor.dto';

@Controller('visitors')
export class VisitorController {
  constructor(private readonly visitorService: VisitorService) {}

  @Get()
  async findAll(): Promise<Visitor[]> {
    return this.visitorService.findAllVisitors();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Visitor> {
    return this.visitorService.findOne(Number(id));
  }

  @Post()
  async create(@Body() createVisitorDto: CreateVisitorDto): Promise<Visitor> {
    return this.visitorService.createVisitor(createVisitorDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateVisitorDto: UpdateVisitorDto): Promise<Visitor> {
    return this.visitorService.updateVisitor(id, updateVisitorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.visitorService.deleteVisitor(id);
  }
}
