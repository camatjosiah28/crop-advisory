import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ['Farmer', 'Admin'], default: 'Farmer' })
  role: string;

  @Column({ nullable: true })
  location: string;

  @CreateDateColumn()
  createdAt: Date;
}