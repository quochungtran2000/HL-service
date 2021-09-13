import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Ward } from '../../model';
import { IGetWardQuery } from '../query.interface';

const ward = async (
  req: Request<any, any, any, IGetWardQuery>,
  res: Response,
  next: NextFunction
) => {
  try {
    const district_id = req.query.district_id;
    const page = req.query.page || 1;
    const page_size = req.query.page_size || 30;
    const skip = (page - 1) * page_size;

    const qr = getRepository(Ward).createQueryBuilder('wa');

    if (district_id) qr.where('wa.district_id = :district_id');

    const [data, total] = await qr
      .take(page_size)
      .skip(skip)
      .setParameters({ district_id: district_id })
      .getManyAndCount();

    return res
      .status(200)
      .json({ total: total, data: data, current_page: page });
  } catch (err) {
    console.log(err);
  }
};

export default ward;
