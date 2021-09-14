import Express from 'express';
import { getCity, getDistrict, getWard } from '../controller';
import createOrder from '../controller/location/createOrder';
const route = Express.Router();

route.get('/city', getCity);
route.get('/district', getDistrict);
route.get('/ward', getWard);
route.post('/city', createOrder);

export default route;
