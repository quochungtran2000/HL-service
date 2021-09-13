import { USER_SECRET } from './constants';
import bcrypt from 'bcrypt';

const jwt = require('jsonwebtoken');

export const generatorToken = async (user: any) => {
  let token = await jwt.sign({ userId: user.id }, USER_SECRET, {
    algorithm: 'HS256',
    subject: `${user.id}`,
    expiresIn: '7d',
  });
  token = `Bearer ${token}`;
  return token;
};

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

export async function comparePassword(
  hashedPassword: string,
  password2: string
) {
  return await bcrypt.compare(password2, hashedPassword);
}

export function removeAccents(name: String) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
}
