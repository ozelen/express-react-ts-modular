import passport from 'passport';
import { User } from '@zelen.uk/models';
import { IUser } from '@zelen.uk/types';
import jwt from 'jsonwebtoken';
import { auth } from './auth';
import createError from 'http-errors';
import bcrypt from 'bcrypt';
import { omit } from 'lodash';

const { Strategy: LocalStrategy } = require('passport-local');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false
}, (email: string, passwd: string, done: CallableFunction) => {
User.findOne({ email })
  .then((user: IUser) => user || done(null, false, { message: 'Incorrect username.' }))
  .then(async ({password, ...user}: IUser) => {
    return await bcrypt.compare(passwd, password + '')
      ? done(null, {user: omit(user, 'password')})
      : done(null, false, { message: 'Incorrect password.' })
  }
);
}));

auth.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(r => {
      console.log('SUCCESS');
      res.send(r);
    })
    .catch(e => {
      console.log(e);
      res.status(400).send(createError(400, e, e));
    });
});

auth.post('/login', (req, res, next) => {
  passport.authenticate('local', {session: false}, (error, user: IUser, info: unknown) => { 
    if (error || !user) {
      return res.status(400).json(info)
    }
 
    req.login(user, {session: false}, (err) => {
      if (err) {
        res.send(err)
      }

      if(!process.env.JWT_SECRET) {
        next(createError(500, 'Invalid JWT configuration'));
        return;
      }
 
      // generate a signed json web token with the contents of user object and return it in the response
 
      const token = jwt.sign({user}, process.env.JWT_SECRET)
      return  res.json({ ...user, token })
    })
  })(req, res)
});

