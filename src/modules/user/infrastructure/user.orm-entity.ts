import { ProfileOrmEntity } from 'src/modules/profile/infrastructure/profile.orm-entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('users')
export class UserOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column({ nullable: true })
  profileId: string;

  @OneToOne(() => ProfileOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'profileId' })
  profile: ProfileOrmEntity;
}
