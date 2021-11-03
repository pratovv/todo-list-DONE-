import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
 

  @Column({ default: false })
  isCompleted: boolean;
}