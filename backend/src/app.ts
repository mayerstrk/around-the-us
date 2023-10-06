import process from 'node:process';
import path from 'node:path';
import express from 'express';
import { connect } from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import { Status } from '../../shared/shared-enums/status';
import protectedRoutes from './routes/protected-routes';
import publicRoutes from './routes/public-routes';
import validateTokenMiddleware from './middleware/validate-token-middleware';
import errorHandlerMiddleware from './middleware/error-handler-middleware';

// eslint-disable-next-line unicorn/prefer-module
const envPath = path.resolve(__dirname, '../.env'); // Adjust the '../.env' part if your .env file is located elsewhere
const result = dotenv.config({ path: envPath });

if (result.error) {
	throw result.error;
}

console.log(process.env.NODE_ENV);

const { PORT = 1000 } = process.env;
const app = express();

app.use(
	cors({
		origin: ['http://localhost:5173', 'http://localhost:4173'],
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials: true,
		optionsSuccessStatus: 204,
	}),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));

connect('mongodb://127.0.0.1:27017/aroundb-test')
	.then(() => {
		app.use('/', publicRoutes);

		app.use('/', validateTokenMiddleware);

		app.use('/', protectedRoutes);

		app.use((_request, response) => {
			response.status(Status.notFound);
		});

		app.use((_request, response) => {
			response.status(Status.notFound).send('Page Not Found');
		});

		app.use('/', errorHandlerMiddleware);

		app.listen(PORT, () => {
			console.log(
				`Listening on port = ${PORT}.\n URL: http://localhost:${PORT}`,
			);
		});
	})
	// eslint-disable-next-line unicorn/prefer-top-level-await
	.catch((error) => {
		console.error('Error initializing server:', error);
	});
