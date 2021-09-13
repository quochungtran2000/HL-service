import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { City } from '../../model/city.entity';
import { IPagingQuery } from '../query.interface';

const city = async (
  req: Request<any, any, any, IPagingQuery>,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = req.query.page || 1;
    const page_size = req.query.page_size || 999;
    const skip = (page - 1) * page_size;

    const [data, total] = await getRepository(City)
      .createQueryBuilder('city')
      .take(page_size)
      .skip(skip)
      .getManyAndCount();

    return res
      .status(200)
      .json({ total: total, data: data, current_page: page });
  } catch (err) {
    console.log(err);
  }
};

export default city;
