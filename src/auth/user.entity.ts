/* eslint-disable @typescript-eslint/no-unused-vars */
import { Task } from 'src/tasks/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany((_type) => Task, (task) => task.user, { eager: true }) // eager: true will fetch, associated task also
  tasks: Task[];
}
