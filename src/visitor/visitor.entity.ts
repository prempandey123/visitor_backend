import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Visitor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  visitorName: string;

  @Column()
  companyName: string;

  @Column({ nullable: true })  // <-- Make email optional
  email: string;

  @Column()
  number: string;

  @Column()
  purposeOfVisit: string;

  @Column()
  hostName: string;

  @Column({ type: 'text', nullable: true })
  visitorImage: string;

  @Column({ type: 'timestamp', nullable: true })
  checkInTime: Date;

  @Column({ type: 'timestamp', nullable: true })
  checkOutTime: Date;
}

