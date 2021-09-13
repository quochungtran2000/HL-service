import Express from 'express';
import { getCity, getDistrict, getWard } from '../controller';
const route = Express.Router();

route.get('/city', getCity);
route.get('/district', getDistrict);
route.get('/ward', getWard);

export default route;
