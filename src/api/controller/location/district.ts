import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { District } from '../../model/district.entity';
import { IGetDistrictQuery } from '../query.interface';

const district = async (
  req: Request<any, any, any, IGetDistrictQuery>,
  res: Response,
  next: NextFunction
) => {
  try {
    const city_id = req.query.city_id;
    const page = req.query.page || 1;
    const page_size = req.query.page_size || 50;
    const skip = (page - 1) * page_size;

    const qr = getRepository(District).createQueryBuilder('ds');

    if (city_id) qr.where('ds.city_id = :city_id');

    const [data, total] = await qr
      .take(page_size)
      .skip(skip)
      .setParameters({ city_id: city_id })
      .getManyAndCount();

    return res
      .status(200)
      .json({ total: total, data: data, current_page: page });
  } catch (err) {
    console.log(err);
  }
};

export default district;
