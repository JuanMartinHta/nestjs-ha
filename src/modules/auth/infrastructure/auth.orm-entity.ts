import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('auth_sessions')
export class AuthOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  token: string;

  @Column()
  createdAt: Date;

  @Column()
  expiresAt: Date;
}
