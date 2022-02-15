import passport from 'passport';
import bodyParser from 'body-parser';
import express from 'express';

export const auth = express();
export const middleware = passport.initialize();

auth.use(bodyParser.urlencoded({ extended: true }));
auth.use(bodyParser.json());

auth.use(middleware);
