import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { District } from '.';

export interface IWard {
  id: number;
  name: string;
  district_id: number;
  is_public: boolean;
}

@Entity({ name: 'ward' })
export class Ward extends BaseEntity implements IWard {
  @PrimaryColumn({ name: 'id' })
  id!: number;

  @Column({ name: 'name' })
  name!: string;

  @Column({ name: 'district_id' })
  district_id!: number;

  @Column({ name: 'is_public' })
  is_public!: boolean;

  @ManyToOne(() => District, (district: District) => district.wards)
  @JoinColumn({ name: 'district_id', referencedColumnName: 'id' })
  district?: District;
}
