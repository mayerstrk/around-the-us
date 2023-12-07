import process from 'node:process';
import { readFileSync } from 'node:fs';
import https from 'node:https';
import express from 'express';
import { connect } from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { errors as celebrateValidator } from 'celebrate';
import protectedRoutes from './routes/protected-routes';
import publicRoutes from './routes/public-routes';
import validateTokenMiddleware from './middleware/validate-token-middleware';
import errorHandlerMiddleware from './middleware/error-handler-middleware';
import { requestLogger, errorLogger } from './middleware/logger';

// Configure express server and set up middleware
const { PORT = 3001, HOST, NODE_ENV, COOKIE_PARSER_SECRET } = process.env;
const app = express();

app.use(
	cors({
		origin: ['https://127.0.0.1:5173', 'https://127.0.0.1:4173'],
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials: true,
		optionsSuccessStatus: 204,
	}),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(COOKIE_PARSER_SECRET));

app.use(requestLogger);

app.use('/', publicRoutes);

app.use('/', validateTokenMiddleware);

app.use('/', protectedRoutes);

app.use(errorLogger);

app.use('/', celebrateValidator());

app.use('/', errorHandlerMiddleware);

// Pull certificates and create https server
const certificate = readFileSync('./certs/127.0.0.1.pem', 'utf8');
const privateKey = readFileSync('./certs/127.0.0.1-key.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };
const httpsServer = https.createServer(credentials, app);

// Connect to MongoDB and start server
const serverListeningMessage =
	NODE_ENV === 'production'
		? `https server running on internal port ${PORT} behind a reverse proxy.
			Public URL: https://${HOST}/`
		: `https server running on port ${PORT}. URL: https://127.0.0.1:${PORT}`;

connect('mongodb://127.0.0.1:27017/aroundb')
	.then(() => {
		httpsServer.listen(PORT, () => {
			console.log(`\n\u001B[36m current environment: ${NODE_ENV}`);
			console.log(`\u001B[35m   ${serverListeningMessage}\u001B[0m
`);
		});
	})
	// eslint-disable-next-line unicorn/prefer-top-level-await
	.catch((error) => {
		console.error('Error initializing server:', error);
	});
