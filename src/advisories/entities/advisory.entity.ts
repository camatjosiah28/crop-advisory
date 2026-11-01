import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Crop } from '../../crops/entities/crop.entity';

@Entity('advisories')
export class Advisory {
  @PrimaryGeneratedColumn()
  advisoryId: number;

  @ManyToOne(() => Crop, { onDelete: 'CASCADE' })
  crop: Crop;

  @Column()
  advisoryType: string;

  @Column()
  riskLevel: string;

  @Column({ type: 'text' })
  message: string;

  @CreateDateColumn()
  createdAt: Date;
}