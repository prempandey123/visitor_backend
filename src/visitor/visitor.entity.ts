import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Visitor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  visitorName: string;

  @Column()
  companyName: string;

  @Column()
  email: string;

  @Column()
  number: string;

  @Column()
  purposeOfVisit: string;

  @Column()
  hostName: string;
}
