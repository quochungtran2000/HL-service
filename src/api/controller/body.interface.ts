import { PrimaryGeneratedColumn } from 'typeorm';
import { ICity, IDistrict } from '../model';

export interface ICreateOrderDTO extends ICity {
  products: OrderProduct[];
}

export interface OrderProduct {
  id: number;
  name: string;
  is_public: boolean;
  path: string;
  city_id?: number;
}
