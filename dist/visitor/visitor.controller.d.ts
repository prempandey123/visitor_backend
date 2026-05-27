import { VisitorService } from './visitor.service';
import { Visitor } from './visitor.entity';
import { CreateVisitorDto } from './createVisitor.dto';
import { UpdateVisitorDto } from './updateVisitor.dto';
export declare class VisitorController {
    private readonly visitorService;
    constructor(visitorService: VisitorService);
    findAll(): Promise<Visitor[]>;
    findOne(id: string): Promise<Visitor>;
    create(createVisitorDto: CreateVisitorDto): Promise<Visitor>;
    update(id: string, updateVisitorDto: UpdateVisitorDto): Promise<Visitor>;
    remove(id: string): Promise<void>;
    checkIn(id: string): Promise<Visitor>;
    checkOut(id: string): Promise<Visitor>;
    bulkUpload(body: {
        visitors: CreateVisitorDto[];
    }): Promise<Visitor[]>;
}
