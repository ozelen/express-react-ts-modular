import '@zelen.uk/auth';

import express from 'express';
import bodyParser from 'body-parser';
import { middleware } from '@zelen.uk/auth';

export const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(middleware);
