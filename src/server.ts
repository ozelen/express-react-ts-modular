import 'dotenv/config';
import { app } from './apps/main';
import { createServer } from 'http';

const server = createServer(app);
server.listen(process.env.PORT);

console.log(`🌈 Server started on port ${process.env.PORT} 🦄`);
