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
// eslint-disable-next-line unicorn/prevent-abbreviations
import { env } from './environment-config';

// Configure express server and set up middlewar
const app = express();

app.use(
	cors({
		origin: [env.WEBSITE_URL],
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials: true,
		optionsSuccessStatus: 204,
	}),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(env.COOKIE_PARSER_SECRET));

app.use(requestLogger);

app.use('/', publicRoutes);

app.use('/', validateTokenMiddleware);

app.use('/', protectedRoutes);

app.use(errorLogger);

app.use('/', celebrateValidator());

app.use('/', errorHandlerMiddleware);

// Pull certificates and create https server
const certificate = readFileSync(env.SSL_CERT_PATH, 'utf8');
const privateKey = readFileSync(env.SSL_PRIVATE_KEY_PATH, 'utf8');
const credentials = { key: privateKey, cert: certificate };
const httpsServer = https.createServer(credentials, app);

// Connect to MongoDB and start server
const serverListeningMessage =
	env.NODE_ENV === 'production'
		? `https server running on internal port ${env.PORT} \
behind a reverse proxy.
			Public URL: https://${env.DOMAIN_NAME}/`
		: `https server running on port ${env.PORT}. \
URL: ${env.WEBSITE_URL}`;

connect('mongodb://127.0.0.1:27017/aroundb')
	.then(() => {
		httpsServer.listen(env.PORT, () => {
			console.log(`\n\u001B[36m current env: ${env.NODE_ENV}`);
			console.log(`\u001B[35m   ${serverListeningMessage}\u001B[0m
`);
		});
	})
	// eslint-disable-next-line unicorn/prefer-top-level-await
	.catch((error) => {
		console.error('Error initializing server:', error);
	});
