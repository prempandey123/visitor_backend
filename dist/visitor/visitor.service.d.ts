import { Repository } from 'typeorm';
import { Visitor } from './visitor.entity';
import { CreateVisitorDto } from './createVisitor.dto';
import { UpdateVisitorDto } from './updateVisitor.dto';
export declare class VisitorService {
    private readonly visitorRepository;
    constructor(visitorRepository: Repository<Visitor>);
    findVisitorByEmail(email: string): Promise<Visitor | undefined>;
    createVisitor(createVisitorDto: CreateVisitorDto): Promise<Visitor>;
    findAllVisitors(): Promise<Visitor[]>;
    findOne(id: number): Promise<Visitor>;
    updateVisitor(id: string, updateVisitorDto: UpdateVisitorDto): Promise<Visitor>;
    deleteVisitor(id: string): Promise<void>;
    updateCheckInTime(id: number): Promise<Visitor>;
    updateCheckOutTime(id: number): Promise<Visitor>;
    parseDate(dateString: string): Date | null;
    bulkInsertVisitors(visitors: CreateVisitorDto[]): Promise<Visitor[]>;
}
