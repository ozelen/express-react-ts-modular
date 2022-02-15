import { IUser, IUserInput } from '@zelen.uk/types';
import { userSignupValidation } from '@zelen.uk/validation';
import { db } from './db';
import bcrypt from 'bcrypt';

export const create = async (body: IUserInput) =>
  userSignupValidation.validate(body, {abortEarly: false})
    .then(checkUniq(body))
    .then(() => bcrypt.hash(body.password, +(process.env.PASSWORD_SALT_ROUNDS || 10)))
    .then(pass => {
      console.log('REG:', pass)
      return pass;
    })
    .then(passwordHash => 
      db.table('users')
        .insert({
          full_name: body.fullName,
          email: body.email,
          password: passwordHash,
        })
        .then(() => body)
        .catch(e => console.error(e))
    )
    // .catch(console.error);

export const createA = (body: IUserInput) =>
  db.table('users').insert(body)
    .then(() => body);

export const login = () => {};
export const logout = () => {};

export const findOne = (clause: {[key: string]: string}): Promise<IUser> =>
  db.table('users').where(clause).first();

// Private
const checkUniq = (body: IUserInput) => () => {
  return db.table('users')
    .select('*')
    .where({email: body.email})
    .then(([found]) => {
      if(found) {
        throw {error: 'User already exists'};
      } else {
        return;
      }
    })
  }
