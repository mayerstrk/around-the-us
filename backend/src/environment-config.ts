import process from 'node:process';
import dotenv from 'dotenv';

dotenv.config();

const enum EnvironmentVariables {
	PORT = 'PORT',
	DOMAIN_NAME = 'DOMAIN_NAME',
	NODE_ENV = 'NODE_ENV',
	SSL_CERT_PATH = 'SSL_CERT_PATH',
	SSL_PRIVATE_KEY_PATH = 'SSL_PRIVATE_KEY_PATH',
	COOKIE_PARSER_SECRET = 'COOKIE_PARSER_SECRET',
	JWT_SECRET = 'JWT_SECRET',
	WEBSITE_URL = 'WEBSITE_URL',
}

const environmentVariables = {
	[EnvironmentVariables.PORT]: process.env.PORT || 3001,
	[EnvironmentVariables.DOMAIN_NAME]: process.env.DOMAIN_NAME || '127.0.0.1',
	[EnvironmentVariables.NODE_ENV]: process.env.NODE_ENV || 'development',
	[EnvironmentVariables.SSL_CERT_PATH]:
		process.env.SSL_CERT_PATH || './certs/127.0.0.1.pem',
	[EnvironmentVariables.SSL_PRIVATE_KEY_PATH]:
		process.env.SSL_PRIVATE_KEY_PATH || './certs/127.0.0.1-key.pem',
	[EnvironmentVariables.COOKIE_PARSER_SECRET]:
		process.env.COOKIE_PARSER_SECRET ||
		'av/WLufmqcoOmpc4YjKIO4vYZTg1AtRH1zww6QEPQyU=',
	[EnvironmentVariables.JWT_SECRET]:
		process.env.JWT_SECRET || '7Sm7R8ynydCY1+2djGSDK3NKrWJ8jJyPba/YwBipr9c=',
	[EnvironmentVariables.WEBSITE_URL]:
		process.env.WEBSITE_URL || 'https://127.0.0.1:5173',
};

export { EnvironmentVariables, environmentVariables as env };
