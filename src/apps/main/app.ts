import express from 'express'; 
import { app as api } from '@zelen.uk/api';
import { auth } from '@zelen.uk/auth';
import bodyParser from 'body-parser';
import cors from 'cors';

export const app = express();  

app.use(cors())
app.use('/', express.static('public'));

app.use('/', express.static(__dirname + '/web/public'));
app.use('/api/v1', api);
app.use('/auth', auth);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
