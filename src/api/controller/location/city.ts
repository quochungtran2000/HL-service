import { NextFunction, Request, Response } from 'express';
import { createQueryBuilder, getRepository } from 'typeorm';
import { City } from '../../model/city.entity';
import { IGetCity } from '../query.interface';

const city = async (
  req: Request<any, any, any, IGetCity>,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = req.query.page || 1;
    const page_size = req.query.page_size || 999;
    const id = req.query.id;
    const skip = (page - 1) * page_size;

    const [data, total] = await getRepository(City)
      .createQueryBuilder('city')
      .leftJoinAndSelect('city.districts', 'dt')
      .where('city.id = :id')
      .take(page_size)
      .skip(skip)
      .setParameters({ id: id })
      .getManyAndCount();

    return res
      .status(200)
      .json({ total: total, data: data, current_page: page });
  } catch (err) {
    console.log(err);
  }
};

export default city;
