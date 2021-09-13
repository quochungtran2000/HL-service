import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { District } from '.';

export interface ICity {
  id: number;
  name: string;
  code: string;
  display_name: string;
  city_code: string;
}

@Entity({ name: 'city' })
export class City extends BaseEntity implements ICity {
  @PrimaryColumn({ name: 'id' })
  id!: number;

  @Column({ name: 'name' })
  name!: string;

  @Column({ name: 'code' })
  code!: string;

  @Column({ name: 'display_name' })
  display_name!: string;

  @Column({ name: 'city_code' })
  city_code!: string;

  @OneToMany(() => District, (district: District) => district.city)
  @JoinColumn({ name: 'id', referencedColumnName: 'city_id' })
  districts!: District[];
}
