import express, { Application, RequestHandler } from 'express';
import config from './config';
// middleware
import logger from './middleware/logger';
import limiter from './middleware/requestLimit';
import httpSecurity from './middleware/security';
import errorMiddleware from './middleware/error';
//configur
//import * as dotenv from 'dotenv';
// api
import routes from './routes';

//dotenv.config();

//create instance server
const app: Application = express();
const PORT = config.port || 3000;
app.use(express.json() as RequestHandler);
app.use(express.urlencoded({ extended: true }) as RequestHandler);

// use logger middleware
app.use(logger);

// http security middleware
app.use(httpSecurity);

//parse incomming requests
app.use(express.json());

// Apply the rate limiting middleware to all requests
app.use(limiter);

// initialise public folder
//app.use(express.static('public'));

// ROUTES /ENDPOINTS
app.use('/', routes);

// start project server
app.listen(PORT, () => {
	console.log(`that server http://localhost:${PORT}
  
      =========is RUNNING==========
      `);
});
//add routing
app.get('/', (req: express.Request, res: express.Response) => {
	res.json('hello world');
});

app.use((req: express.Request, res: express.Response) => {
	res.status(404).json({
		message: 'bad request',
	});
});
/// handling errors
app.use(errorMiddleware);

export default app;
