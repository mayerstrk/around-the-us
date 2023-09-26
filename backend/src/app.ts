import process from 'node:process';
import express from 'express';
import { connect } from 'mongoose';
import cookieParser from 'cookie-parser';
import { Status } from '../../shared/shared-enums/status';
// eslint-disable-next-line import/no-unassigned-import
import './types/express-extensions';
import protectedRoutes from './routes/protected-routes';
import publicRoutes from './routes/public-routes';
import validateTokenMiddleware from './middleware/validate-token-middleware';

const { PORT = 1000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));

connect('mongodb://127.0.0.1:27017/aroundb-test')
	.then(() => {
		app.use((request, _response, next) => {
			request.user = {
				_id: '6457084afc70e0645e49b7aa',
			};
			next();
		});

		app.use('/', publicRoutes);

		app.use('/', validateTokenMiddleware);

		app.use('/', protectedRoutes);

		app.use((_request, response) => {
			response.status(Status.notFound);
		});

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
