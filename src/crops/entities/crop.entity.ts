import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('crops')
export class Crop {
  @PrimaryGeneratedColumn()
  cropId: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  cropType: string;

  @Column({ type: 'date' })
  plantingDate: Date;

  @Column()
  location: string;

  @Column({ type: 'enum', enum: ['Growing', 'Harvested', 'Failed'], default: 'Growing' })
  status: any;

  @CreateDateColumn()
  createdAt: Date;
}