import process from 'node:process';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import https from 'node:https';
import express from 'express';
import { connect } from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import { errors as celebrateValidator } from 'celebrate';
import { Status } from '../../shared/shared-enums/status';
import protectedRoutes from './routes/protected-routes';
import publicRoutes from './routes/public-routes';
import validateTokenMiddleware from './middleware/validate-token-middleware';
import errorHandlerMiddleware from './middleware/error-handler-middleware';
import { requestLogger, errorLogger } from './middleware/logger';

// eslint-disable-next-line unicorn/prefer-module
const envPath = path.resolve(__dirname, '../.env'); // Adjust the '../.env' part if your .env file is located elsewhere
const result = dotenv.config({ path: envPath });

if (result.error) {
	throw result.error;
}

console.log(process.env.NODE_ENV);

const { PORT = 3001 } = process.env;
const app = express();

app.use(
	cors({
		origin: ['https://localhost:5173', 'https://localhost:4173'],
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials: true,
		optionsSuccessStatus: 204,
	}),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));

app.use(requestLogger);

app.use('/', publicRoutes);

app.use('/', validateTokenMiddleware);

app.use('/', protectedRoutes);

app.use((_request, response) => {
	response.status(Status.notFound);
});

app.use((_request, response) => {
	response.status(Status.notFound).send('Page Not Found');
});

app.use(errorLogger);

app.use('/', celebrateValidator());

app.use('/', errorHandlerMiddleware);

const privateKey = readFileSync('./certs/privatekey.pem', 'utf8');
const certificate = readFileSync('./certs/certificate.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };
const httpsServer = https.createServer(credentials, app);

connect('mongodb://127.0.0.1:27017/aroundb-test')
	.then(() => {
		httpsServer.listen(PORT, () => {
			console.log(
				`HTTPS Server running on port ${PORT}. URL: https://localhost:${PORT}`,
			);
		});
	})
	// eslint-disable-next-line unicorn/prefer-top-level-await
	.catch((error) => {
		console.error('Error initializing server:', error);
	});
