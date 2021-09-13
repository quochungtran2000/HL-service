import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { City, Ward } from '.';

export interface IDistrict {
  id: number;
  name: string;
  city_id: number;
  is_public: boolean;
  path: string;
}

@Entity({ name: 'district' })
export class District extends BaseEntity implements IDistrict {
  @PrimaryColumn({ name: 'id' })
  id!: number;

  @Column({ name: 'name' })
  name!: string;

  @Column({ name: 'city_id' })
  city_id!: number;

  @Column({ name: 'is_public' })
  is_public!: boolean;

  @Column({ name: 'path' })
  path!: string;

  @ManyToOne(() => City, (city: City) => city.districts)
  @JoinColumn({ name: 'city_id', referencedColumnName: 'id' })
  city!: City;

  @OneToMany(() => Ward, (ward: Ward) => ward.district)
  @JoinColumn({ name: 'id', referencedColumnName: 'district_id' })
  wards?: Ward[];
}
