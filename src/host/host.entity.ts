// src/host/host.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class Host {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  number: string;

  @Column()
  password: string;

  @Column()
  designation: string;

  @Column()
  department: string;

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

@Column({ type: 'timestamp', nullable: true })
checkInTime: Date;

@Column({ type: 'timestamp', nullable: true })
checkOutTime: Date;

}
