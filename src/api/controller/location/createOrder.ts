import { NextFunction, Request, Response } from 'express';
import { createQueryBuilder, getRepository } from 'typeorm';
import { District, IDistrict } from '../../model';
import { City } from '../../model/city.entity';
import { ICreateOrderDTO } from '../body.interface';
import { IPagingQuery } from '../query.interface';

const createOrder = async (
  req: Request<any, any, ICreateOrderDTO, any>,
  res: Response,
  next: NextFunction
) => {
  try {
    // console.log(req.body)
    const data = req.body;
    const { products, ...city } = data;

    console.log(`products`, products);
    console.log(`city`, city);

    const result = await createQueryBuilder('city')
      .insert()
      .into(City)
      .values([city])
      .execute();

    const order_id: number = result.identifiers[0].id;

    const orderlines = products.map((item: any) => {
      return { ...item, city_id: order_id };
    });

    console.log(orderlines);

    await createQueryBuilder('district')
      .insert()
      .into(District)
      .values(orderlines)
      .execute();
    res.status(200).json({ asd: 'result' });
  } catch (err) {
    console.log(err);
  }
};

export default createOrder;
